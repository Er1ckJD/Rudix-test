import { Stack } from 'expo-router';

export default function RideLayout() {
  return (
    <Stack>
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="select-service" options={{ presentation: 'modal' }} />
      <Stack.Screen name="tracking" options={{ headerShown: false }} />
      <Stack.Screen name="rating" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
