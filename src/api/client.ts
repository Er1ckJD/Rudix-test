// src/api/client.ts
// ========================================
// API CLIENT SIMPLIFICADO PARA FRONTEND
// Ready para conectar backend en el futuro
// ========================================

import axios from 'axios';
import { storage } from '@/utils/storage';

// Configuración simple - cambiar cuando tengas backend
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

// ============================================
// INTERCEPTOR - Token automático
// ============================================
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

// ============================================
// RESPONSE - Manejo básico
// ============================================
apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('✅ API Response:', response.status);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.log('❌ API Error:', error.response?.status || error.message);
    }
    return Promise.reject(error);
  }
);

// ============================================
// HELPER: Check si estamos en modo mock
// ============================================
export const isMockMode = () => {
  // Puedes cambiar esto a false cuando tengas backend real
  return __DEV__ || !BASE_URL.includes('api.rudix.com');
};

// ============================================
// HELPER: Manejo de errores simple
// ============================================
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