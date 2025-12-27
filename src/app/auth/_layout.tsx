import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login-options" />
      <Stack.Screen name="phone-input" />
      <Stack.Screen name="verify-code" />
    </Stack>
  );
}
