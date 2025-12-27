import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 1. Cambia esto por tu URL real (puedes usar variables de entorno .env)
const BASE_URL = process.env.EXPO_PUBLIC_API_URL; 

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token automáticamente en cada petición
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error('Failed to get token from secure store', e);
  }
  return config;
});