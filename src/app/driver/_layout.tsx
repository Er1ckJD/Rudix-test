import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent'; // Asegúrate de que este componente soporte opciones de conductor

export default function DriverLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="home" options={{ title: 'Inicio Conductor' }} />
        <Drawer.Screen name="wallet" options={{ title: 'Billetera' }} />
        <Drawer.Screen name="fidelity" options={{ title: 'Fidelidad' }} />
        <Drawer.Screen name="register" options={{ 
            drawerItemStyle: { display: 'none' } // Ocultar registro del menú
        }} />
        <Drawer.Screen name="settings" options={{ title: 'Configuración' }} />
        <Drawer.Screen name="support" options={{ title: 'Soporte' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}