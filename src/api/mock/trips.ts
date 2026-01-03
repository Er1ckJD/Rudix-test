import { Trip } from '@/types/trip';

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip_1',
    date: '15 Dic 2025 - 14:30',
    pickupAddress: 'Centro Histórico',
    dropoffAddress: 'Plaza las Américas',
    price: '$ 89.00',
    status: 'completed',
    distance: '8.2 km',
    duration: '22 min',
    driver: {
      id: 'd1',
      name: 'Carlos Mendoza',
      rating: 4.82,
      photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      vehicleModel: 'Nissan Versa',
      vehiclePlate: 'A23348*D',
    },
  },
  {
    id: 'trip_2',
    date: '14 Dic 2025 - 09:15',
    pickupAddress: 'Av. Reforma',
    dropoffAddress: 'Aeropuerto INT',
    price: '$ 150.00',
    status: 'completed',
    distance: '12.5 km',
    duration: '45 min',
    driver: {
      id: 'd2',
      name: 'Ana López',
      rating: 4.95,
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      vehicleModel: 'Kia Rio',
      vehiclePlate: 'B9912*Z',
    },
  },
  {
    id: 'trip_3',
    date: '13 Dic 2025 - 18:00',
    pickupAddress: 'Condesa',
    dropoffAddress: 'Polanco',
    price: '$ 75.50',
    status: 'cancelled',
    distance: '5.1 km',
    duration: '18 min',
    driver: {
        id: 'd3',
        name: 'Jorge Ramos',
        rating: 4.7,
        photoUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
        vehicleModel: 'VW Jetta',
        vehiclePlate: 'C5432*A',
    },
  }
];
