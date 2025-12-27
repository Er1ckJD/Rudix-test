import { Stack } from 'expo-router';

export default function WalletLayout() {
  return (
    <Stack screenOptions={{ 
        headerShown: true,
        headerTintColor: '#333',
        headerBackTitle: 'Atrás',
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#f9f9f9' }
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
            title: 'Mi Billetera',
            headerStyle: { backgroundColor: '#f9f9f9' } 
        }} 
      />
      <Stack.Screen 
        name="withdraw" 
        options={{ title: 'Retirar Fondos' }} 
      />
       <Stack.Screen 
        name="payment-methods" 
        options={{ title: 'Métodos de Pago' }} 
      />
    </Stack>
  );
}