// src/app/_layout.tsx
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ColorSchemeProvider, useColorScheme } from '@/hooks/use-color-scheme';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import { useAuthNavigation } from '@/hooks/useAuthNavigation';

// Layout interno con acceso a auth
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { loading } = useAuth();
  
  useAuthNavigation();

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
  const stripeKey = Constants.expoConfig?.extra?.stripeKey;

  return (
    <ErrorBoundary>
        <ColorSchemeProvider>
            <AuthProvider>
                {stripeKey ? (
                  <StripeProvider
                      publishableKey={stripeKey}
                      merchantIdentifier="merchant.com.rudix" // Requerido para Apple Pay
                  >
                      <RootLayoutNav />
                  </StripeProvider>
                ) : (
                  <RootLayoutNav />
                )}
                <Toast />
            </AuthProvider>
        </ColorSchemeProvider>
    </ErrorBoundary>
  );
}
