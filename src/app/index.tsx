import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user, loading, activeRole } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 1. Si no hay usuario, mandar al Login
  if (!user) {
    return <Redirect href="/auth" />;
  }

  // 2. Si es Conductor, mandar a su layout (ahora debe ser un Drawer como vimos arriba)
  if (activeRole === 'driver') {
    return <Redirect href="/(driver)/(home)" />;
  }

  // 3. Por defecto (Pasajero), mandar a los Tabs
  return <Redirect href="/(passenger)/(home)" />;
}
