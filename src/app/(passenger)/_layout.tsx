// src/app/(passenger)/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';

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
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
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
            drawerIcon: ({ color, size }) => <Ionicons name="shield-checkmark-outline" size={size} color={color} />,
          }}
        />

        {/* Notificaciones */}
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: 'Notificaciones',
            title: 'Notificaciones',
            drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
          }}
        />

        {/* Perfil */}
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Mi Perfil',
            title: 'Mi Perfil',
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />

        {/* Seguridad */}
        <Drawer.Screen
          name="safety"
          options={{
            drawerLabel: 'Seguridad',
            title: 'Seguridad',
            drawerIcon: ({ color, size }) => <Ionicons name="shield-outline" size={size} color={color} />,
          }}
        />

        {/* Configuración */}
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Configuración',
            title: 'Configuración',
            drawerIcon: ({ color, size }) => <Ionicons name="options-outline" size={size} color={color} />,
          }}
        />

        {/* Soporte */}
        <Drawer.Screen
          name="support"
          options={{
            drawerLabel: 'Soporte',
            title: 'Centro de Soporte',
            drawerIcon: ({ color, size }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}