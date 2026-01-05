// src/app/(driver)/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';

export default function DriverLayout() {
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
        {/* Pantalla principal (sin tabs, solo mapa) */}
        <Drawer.Screen
          name="(home)"
          options={{
            drawerLabel: 'Inicio',
            title: 'Modo Conductor',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />

        {/* Registro conductor (oculto del drawer) */}
        <Drawer.Screen
          name="register"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />

        {/* Ganancias */}
        <Drawer.Screen
          name="earnings"
          options={{
            drawerLabel: 'Ganancias',
            title: 'Mi Billetera',
            drawerIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
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
            drawerLabel: 'Ayuda',
            title: 'Centro de Ayuda',
            drawerIcon: ({ color, size }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}