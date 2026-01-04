// src/config/env.ts
import Constants from 'expo-constants';

export type Environment = 'development' | 'staging' | 'production';

interface Config {
  env: Environment;
  apiUrl: string;
  socketUrl: string;
  stripeKey: string;
  sentryDsn?: string;
  // Agrega más según necesites
}

function getEnvVars(): Config {
  const env = (Constants.expoConfig?.extra?.environment || 'development') as Environment;
  
  const configs: Record<Environment, Config> = {
    development: {
      env: 'development',
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.100:3000',
      socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL || 'http://192.168.1.100:3000',
      stripeKey: process.env.EXPO_PUBLIC_STRIPE_KEY_DEV || '',
    },
    staging: {
      env: 'staging',
      apiUrl: process.env.EXPO_PUBLIC_API_URL_STAGING || 'https://staging-api.rudix.com',
      socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL_STAGING || 'https://staging-api.rudix.com',
      stripeKey: process.env.EXPO_PUBLIC_STRIPE_KEY_STAGING || '',
    },
    production: {
      env: 'production',
      apiUrl: process.env.EXPO_PUBLIC_API_URL_PROD || 'https://api.rudix.com',
      socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL_PROD || 'https://api.rudix.com',
      stripeKey: process.env.EXPO_PUBLIC_STRIPE_KEY_PROD || '',
      sentryDsn: process.env.SENTRY_DSN,
    },
  };

  return configs[env];
}

export const ENV = getEnvVars();

// Helper para logs
export const isDevelopment = ENV.env === 'development';
export const isProduction = ENV.env === 'production';

// Log de configuración (solo en dev)
if (__DEV__) {
  console.log('📱 Environment Config:', {
    env: ENV.env,
    apiUrl: ENV.apiUrl,
    socketUrl: ENV.socketUrl,
  });
}