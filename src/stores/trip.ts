// src/stores/trip.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '@/types/trip';

interface TripState {
  currentTrip: Trip | null;
  tripHistory: Trip[];
  
  // Actions
  setCurrentTrip: (trip: Trip | null) => void;
  addTripToHistory: (trip: Trip) => void;
  clearHistory: () => void;
  getTripById: (id: string) => Trip | undefined;
}

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      currentTrip: null,
      tripHistory: [],
      
      setCurrentTrip: (trip) => set({ currentTrip: trip }),
      
      addTripToHistory: (trip) => set((state) => ({
        tripHistory: [trip, ...state.tripHistory].slice(0, 50) // Max 50
      })),
      
      clearHistory: () => set({ tripHistory: [] }),
      
      getTripById: (id) => {
        const state = get();
        return state.tripHistory.find(trip => trip.id === id);
      },
    }),
    {
      name: 'trip-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Solo persistir historial, no viaje actual
      partialize: (state) => ({ tripHistory: state.tripHistory }),
    }
  )
);