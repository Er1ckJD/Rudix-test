// src/api/services/auth.service.ts
// ========================================
// AUTH SERVICE - Ready para backend
// ========================================

import { apiClient, isMockMode } from '@/api/client';
import { MOCK_USER } from '@/mocks';
import { storage } from '@/utils/storage';
import type {
  LoginRequest,
  LoginResponse,
  SendOTPRequest,
  SendOTPResponse,
  VerifyOTPRequest,
  RegisterRequest,
} from '@/types/api';

export class AuthService {
  // ============================================
  // LOGIN con Email/Password
  // ============================================
  static async login(data: LoginRequest): Promise<LoginResponse> {
    if (isMockMode()) {
      // 🎭 Mock local
      await delay(1500);
      
      // Simular validación
      if (data.email === 'demo@rudix.com' && data.password === 'demo123') {
        const mockToken = 'mock-token-' + Date.now();
        const mockRefresh = 'mock-refresh-' + Date.now();
        
        return {
          user: MOCK_USER,
          token: mockToken,
          refreshToken: mockRefresh,
          success: true,
        };
      }
      
      throw new Error('Credenciales inválidas');
    }
    
    // 🔌 Backend real (futuro)
    const { data: response } = await apiClient.post<LoginResponse>(
      '/auth/login',
      data
    );
    
    return response;
  }

  // ============================================
  // REGISTRO
  // ============================================
  static async register(data: RegisterRequest): Promise<LoginResponse> {
    if (isMockMode()) {
      await delay(2000);
      
      const mockToken = 'mock-token-' + Date.now();
      const mockRefresh = 'mock-refresh-' + Date.now();
      
      return {
        user: {
          ...MOCK_USER,
          email: data.email,
          nombres: data.nombres,
          apellidos: data.apellidos,
        },
        token: mockToken,
        refreshToken: mockRefresh,
        success: true,
      };
    }
    
    const { data: response } = await apiClient.post<LoginResponse>(
      '/auth/register',
      data
    );
    
    return response;
  }

  // ============================================
  // OTP - Enviar código
  // ============================================
  static async sendOTP(data: SendOTPRequest): Promise<SendOTPResponse> {
    if (isMockMode()) {
      await delay(1000);
      console.log('📱 Mock OTP enviado al:', data.telefono);
      console.log('🔐 Código de prueba: 1234');
      
      return {
        message: 'Código enviado exitosamente',
        success: true,
      };
    }
    
    const { data: response } = await apiClient.post<SendOTPResponse>(
      '/auth/send-otp',
      data
    );
    
    return response;
  }

  // ============================================
  // OTP - Verificar código
  // ============================================
  static async verifyOTP(data: VerifyOTPRequest): Promise<LoginResponse> {
    if (isMockMode()) {
      await delay(1500);
      
      // En mock, cualquier código funciona (o solo '1234')
      if (data.code === '1234' || __DEV__) {
        const mockToken = 'mock-token-' + Date.now();
        const mockRefresh = 'mock-refresh-' + Date.now();
        
        return {
          user: {
            ...MOCK_USER,
            telefono: data.telefono,
          },
          token: mockToken,
          refreshToken: mockRefresh,
          success: true,
        };
      }
      
      throw new Error('Código inválido');
    }
    
    const { data: response } = await apiClient.post<LoginResponse>(
      '/auth/verify-otp',
      data
    );
    
    return response;
  }

  // ============================================
  // GET Current User
  // ============================================
  static async getCurrentUser() {
    if (isMockMode()) {
      await delay(500);
      return { user: MOCK_USER };
    }
    
    const { data } = await apiClient.get('/auth/me');
    return data;
  }

  // ============================================
  // LOGOUT
  // ============================================
  static async logout() {
    if (isMockMode()) {
      await delay(300);
      // Solo limpiar storage local
      await storage.removeSecureItem('userToken');
      await storage.removeSecureItem('refreshToken');
      return;
    }
    
    // Notificar al backend
    await apiClient.post('/auth/logout');
    await storage.removeSecureItem('userToken');
    await storage.removeSecureItem('refreshToken');
  }

  // ============================================
  // REFRESH Token
  // ============================================
  static async refreshToken(refreshToken: string) {
    if (isMockMode()) {
      await delay(500);
      return {
        token: 'mock-token-refreshed-' + Date.now(),
        refreshToken: 'mock-refresh-refreshed-' + Date.now(),
      };
    }
    
    const { data } = await apiClient.post('/auth/refresh', {
      refreshToken,
    });
    
    return data;
  }
}

// Helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));