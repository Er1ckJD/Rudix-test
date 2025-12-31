import axios from 'axios';
import { storage } from '@/utils/storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log('API URL:', BASE_URL);

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token y manejar errores
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getSecureItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Log the error but allow the request to proceed,
      // as it might be a public route.
      console.error('Failed to get token from secure store', e);
    }
    return config;
  },
  (error) => {
    // Para errores en la configuración de la petición
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);