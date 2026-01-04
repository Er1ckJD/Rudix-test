// src/mocks/user.ts
import { User } from '@/types/user';

export const MOCK_USER: User = {
  id: 'mock-user-id',
  nombres: 'Kiki',
  apellidos: 'Mock',
  email: 'kiki.mock@example.com',
  telefono: '+11234567890',
  photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  roles: ['user', 'driver'],
  rating: 4.8,
  totalTrips: 123,
  fidelityLevel: 'plus',
};
