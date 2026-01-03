import axios from 'axios';
import axiosRetry from 'axios-retry';
import { storage } from './storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';
console.log('API URL:', BASE_URL);

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función mock para refrescar el token
async function refreshAuthToken() {
    console.log('Attempting to refresh auth token...');
    // En una implementación real, harías una petición a tu endpoint de refresh
    // y devolverías el nuevo token.
    // Por ahora, devolvemos un token falso.
    const newToken = 'mock-refreshed-user-token';
    await storage.setSecureItem('userToken', newToken);
    return newToken;
}


// Interceptor para inyectar el token en cada petición
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getSecureItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Failed to get token from secure store', e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y reintentar en caso de 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Si el error es 401 y no es un reintento
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAuthToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // Reintentar la petición original con el nuevo token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, desloguear al usuario o manejar el error
        console.error('Token refresh failed', refreshError);
        // Aquí podrías redirigir al login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


// Configuración de reintentos para fallos de red o errores 5xx
axiosRetry(apiClient, { 
    retries: 3, // Número de reintentos
    retryDelay: (retryCount) => {
        return retryCount * 1000; // 1s, 2s, 3s
    },
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
    }
});