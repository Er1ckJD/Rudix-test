import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DriverLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // Ocultamos el header nativo porque DriverHomeScreen tiene el suyo
          drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          drawerType: 'front',
        }}
      >
        <Drawer.Screen 
          name="home" 
          options={{ 
            drawerLabel: 'Inicio',
            title: 'Inicio' 
          }} 
        />
        <Drawer.Screen 
          name="wallet" 
          options={{ 
            drawerLabel: 'Billetera',
            title: 'Mi Billetera' 
          }} 
        />
        <Drawer.Screen 
          name="fidelity" 
          options={{ 
            drawerLabel: 'Nivel / Fidelidad',
            title: 'Programa de Fidelidad' 
          }} 
        />
        <Drawer.Screen 
          name="settings" 
          options={{ 
            drawerLabel: 'Configuración',
            title: 'Configuración' 
          }} 
        />
        <Drawer.Screen 
          name="support" 
          options={{ 
            drawerLabel: 'Ayuda y Soporte',
            title: 'Soporte' 
          }} 
        />
        
        {/* Rutas ocultas del menú pero accesibles */}
        <Drawer.Screen 
          name="register" 
          options={{ 
            drawerItemStyle: { display: 'none' } 
          }} 
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
