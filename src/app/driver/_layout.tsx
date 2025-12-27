import { Stack } from 'expo-router';

export default function DriverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="wallet" />
      <Stack.Screen name="fidelity" />
      <Stack.Screen name="register" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="support" />
    </Stack>
  );
}
