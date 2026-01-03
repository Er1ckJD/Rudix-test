import { MOCK_TRIPS } from '../mock/trips';
import { Trip } from '@/types/trip';

// Simula una llamada a la API con un retraso
export const getTripHistory = (): Promise<Trip[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TRIPS);
    }, 1000); // 1 segundo de retraso
  });
};

export const getTripById = (id: string): Promise<Trip | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_TRIPS.find(trip => trip.id === id));
        }, 500);
    });
}
