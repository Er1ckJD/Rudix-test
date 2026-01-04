// src/types/api.ts
// ========================================
// TYPES DE API - Contratos frontend/backend
// ========================================

import { User } from './user';

// ============================================
// AUTH ENDPOINTS
// ============================================

// POST /auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  success: boolean;
}

// POST /auth/register
export interface RegisterRequest {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  password: string;
}

// POST /auth/send-otp
export interface SendOTPRequest {
  telefono: string;
}

export interface SendOTPResponse {
  message: string;
  success: boolean;
}

// POST /auth/verify-otp
export interface VerifyOTPRequest {
  telefono: string;
  code: string;
}

// ============================================
// TRIPS ENDPOINTS
// ============================================

// GET /trips
export interface GetTripsQuery {
  status?: 'completed' | 'cancelled' | 'in_progress';
  limit?: number;
  offset?: number;
}

export interface GetTripsResponse {
  trips: Trip[];
  total: number;
  hasMore: boolean;
}

// POST /trips/request
export interface RequestTripRequest {
  pickupLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  dropoffLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  serviceType: 'standard' | 'lux' | 'pool';
  paymentMethod: 'cash' | 'card';
}

export interface RequestTripResponse {
  tripId: string;
  estimatedPrice: number;
  estimatedTime: number;
  success: boolean;
}

// GET /trips/:id
export interface GetTripResponse {
  trip: Trip;
}

// POST /trips/:id/cancel
export interface CancelTripRequest {
  reason?: string;
}

// POST /trips/:id/rate
export interface RateTripRequest {
  rating: number;
  comment?: string;
}

// ============================================
// DRIVER ENDPOINTS (cuando seas conductor)
// ============================================

// POST /driver/register
export interface DriverRegisterRequest {
  licenseNumber: string;
  licenseExpiry: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleYear: number;
  vehicleColor: string;
  serviceType: 'standard' | 'lux';
  // Documentos (IDs de archivos subidos)
  documents: {
    ine_front: string;
    ine_back: string;
    license_front: string;
    license_back: string;
    vehicle_photo: string;
  };
}

// GET /driver/earnings
export interface GetEarningsResponse {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
  transactions: EarningsTransaction[];
}

// POST /driver/toggle-online
export interface ToggleOnlineRequest {
  isOnline: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// ============================================
// PAYMENT ENDPOINTS
// ============================================

// GET /payment/methods
export interface GetPaymentMethodsResponse {
  methods: PaymentMethod[];
  defaultMethod?: string;
}

// POST /payment/methods
export interface AddPaymentMethodRequest {
  type: 'card' | 'cash';
  cardToken?: string; // Stripe token
}

// DELETE /payment/methods/:id
export interface DeletePaymentMethodResponse {
  success: boolean;
}

// ============================================
// NOTIFICATIONS
// ============================================

// GET /notifications
export interface GetNotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

// POST /notifications/:id/read
export interface MarkNotificationReadResponse {
  success: boolean;
}

// ============================================
// SUPPORT
// ============================================

// POST /support/ticket
export interface CreateSupportTicketRequest {
  subject: string;
  message: string;
  category: 'trip' | 'payment' | 'account' | 'other';
  tripId?: string;
}

export interface CreateSupportTicketResponse {
  ticketId: string;
  success: boolean;
}

// ============================================
// SHARED TYPES
// ============================================

import { Trip } from './trip';

interface EarningsTransaction {
  id: string;
  type: 'trip' | 'bonus' | 'withdrawal';
  amount: number;
  date: string;
  description: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'cash';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

interface Notification {
  id: string;
  type: 'trip' | 'promo' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ============================================
// GENERIC API RESPONSE
// ============================================

export interface ApiResponse<T = any> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}