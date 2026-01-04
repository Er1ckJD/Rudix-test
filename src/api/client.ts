// src/api/client.ts
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { storage } from '@/utils/storage';
import { AuthService } from './services/auth.service';

const BASE_URL = __DEV__ 
  ? 'http://localhost:3000' // Para pruebas locales con backend
  : 'https://api.rudix.com'; // Para producción futura

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getSecureItem('userToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (__DEV__) {
      console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('✅ API Response:', response.status);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          if(originalRequest.headers){
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
          }
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await storage.getSecureItem('refreshToken');
        if (!refreshToken) {
            throw new Error('no refresh token');
        }
        const { token: newToken, refreshToken: newRefreshToken } = await AuthService.refreshToken(refreshToken);
        await storage.setSecureItem('userToken', newToken);
        await storage.setSecureItem('refreshToken', newRefreshToken);
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
        if(originalRequest.headers){
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        }
        processQueue(null, newToken);
        return apiClient(originalRequest);
      } catch (e) {
        processQueue(e, null);
        AuthService.logout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    if (__DEV__) {
        console.log('❌ API Error:', error.response?.status || error.message);
    }
    
    return Promise.reject(error);
  }
);

export const isMockMode = () => {
  return __DEV__ || !BASE_URL.includes('api.rudix.com');
};

export function getErrorMessage(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Error desconocido';
}

export default apiClient;
