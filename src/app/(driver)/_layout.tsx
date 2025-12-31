// src/app/(driver)/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';

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