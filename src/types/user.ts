// src/types/user.ts

export type UserRole = 'user' | 'driver';

export interface User {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  photoUrl?: string; // URL de la foto de perfil
  roles: UserRole[]; // Roles que tiene el usuario
  // Datos adicionales
  rating?: number;
  totalTrips?: number;
  fidelityLevel?: 'base' | 'plus' | 'premium';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthData {
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  email?: string;
  password?: string;
}