import { Stack } from 'expo-router';

export default function DriverRegisterLayout() {
  return (
    <Stack screenOptions={{ 
        headerShown: true, // Queremos mostrar la flecha de atrás
        headerTitle: '', // Sin título
        headerShadowVisible: false, // Sin línea divisora
        headerTintColor: '#000', // Flecha negra
        contentStyle: { backgroundColor: '#fff' }
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      {/* Las demás pantallas heredarán la flecha de regreso por defecto */}
    </Stack>
  );
}