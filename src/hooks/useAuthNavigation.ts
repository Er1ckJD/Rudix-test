// src/hooks/useAuthNavigation.ts
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from './useAuth';

export function useAuthNavigation() {
  const { user, loading, activeRole } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inPassengerGroup = segments[0] === '(passenger)';
    const inDriverGroup = segments[0] === '(driver)';

    // Usuario NO autenticado
    if (!user) {
      if (!inAuthGroup && !inOnboardingGroup) {
        router.replace('/(auth)');
      }
      return;
    }

    // Usuario autenticado
    if (inAuthGroup) {
      const route = activeRole === 'driver' 
        ? '/(driver)/(home)' 
        : '/(passenger)/(home)';
      router.replace(route);
      return;
    }

    // Validar acceso a sección conductor
    if (inDriverGroup && !user.roles?.includes('driver')) {
      router.replace('/(passenger)/(home)');
    }

  }, [user, loading, segments, activeRole]);
}