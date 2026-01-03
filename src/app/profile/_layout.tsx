import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="payment-methods" options={{ title: 'Métodos de Pago' }} />
      <Stack.Screen name="add-card" options={{ title: 'Agregar Tarjeta', presentation: 'modal' }} />
    </Stack>
  );
}