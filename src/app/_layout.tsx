// src/app/_layout.tsx
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ColorSchemeProvider, useColorScheme } from '@/hooks/use-color-scheme';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Layout interno con acceso a auth
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading, activeRole } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPassengerGroup = segments[0] === '(passenger)';
    const inDriverGroup = segments[0] === '(driver)';

    // Usuario NO autenticado
    if (!user) {
      if (!inAuthGroup) {
        router.replace('/(auth)');
      }
      return;
    }

    // Usuario autenticado
    if (inAuthGroup) {
      // Redirigir según rol activo
      if (activeRole === 'driver') {
        router.replace('/(driver)/(home)');
      } else {
        router.replace('/(passenger)/(home)');
      }
      return;
    }

    // Validar acceso a sección conductor
    if (inDriverGroup && !user.roles?.includes('driver')) {
      // No tiene permiso, regresar a pasajero
      router.replace('/(passenger)/(home)');
    }

  }, [user, loading, segments, activeRole]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(passenger)" />
        <Stack.Screen name="(driver)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

// Provider wrapper
export default function RootLayout() {
  return (
    <ErrorBoundary>
        <ColorSchemeProvider>
            <AuthProvider>
                <RootLayoutNav />
                <Toast />
            </AuthProvider>
        </ColorSchemeProvider>
    </ErrorBoundary>
  );
}
