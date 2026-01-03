// src/app/(passenger)/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';

export default function PassengerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            width: '75%',
            backgroundColor: '#fff',
          },
        }}
      >
        {/* Pantalla principal con tabs */}
        <Drawer.Screen
          name="(home)"
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
          }}
        />
        
        {/* Stack de viajes */}
        <Drawer.Screen
          name="ride"
          options={{
            drawerItemStyle: { display: 'none' }, // No visible en drawer
          }}
        />

        {/* Fidelidad */}
        <Drawer.Screen
          name="fidelity"
          options={{
            drawerLabel: 'Fidelity',
            title: 'RuDix Fidelity',
          }}
        />

        {/* Notificaciones */}
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: 'Notificaciones',
            title: 'Notificaciones',
          }}
        />

        {/* Perfil */}
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Mi Perfil',
            title: 'Perfil',
          }}
        />

        {/* Seguridad */}
        <Drawer.Screen
          name="safety"
          options={{
            drawerLabel: 'Seguridad',
            title: 'Seguridad',
          }}
        />

        {/* Configuración */}
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Configuración',
            title: 'Configuración',
          }}
        />

        {/* Soporte */}
        <Drawer.Screen
          name="support"
          options={{
            drawerLabel: 'Ayuda',
            title: 'Centro de Ayuda',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}