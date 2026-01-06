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
          headerShown: false, // O true, según tu diseño global. Aquí lo tenías en false en el ejemplo anterior
          drawerType: 'front',
          drawerStyle: {
            width: '75%',
            backgroundColor: '#fff',
          },
        }}
      >
        {/* 1. Inicio */}
        <Drawer.Screen
          name="(home)/index"
          options={{
            drawerLabel: 'Inicio',
            title: 'Modo Conductor',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />

        {/* 2. Registro (Oculto) */}
        <Drawer.Screen
          name="register"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />

        {/* 3. Ganancias */}
        <Drawer.Screen
          name="earnings/index"
          options={{
            drawerLabel: 'Ganancias',
            title: 'Mi Billetera',
            drawerIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />,
          }}
        />

        {/* 4. Fidelidad */}
        <Drawer.Screen
          name="fidelity/index"
          options={{
            drawerLabel: 'Fidelity',
            title: 'RuDix Fidelity',
            drawerIcon: ({ color, size }) => <Ionicons name="shield-checkmark-outline" size={size} color={color} />,
          }}
        />

        {/* 5. Soporte */}
        <Drawer.Screen
          name="support/index"
          options={{
            drawerLabel: 'Soporte',
            title: 'Centro de Soporte',
            drawerIcon: ({ color, size }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
          }}
        />

        {/* 6. Configuración (El menú principal) */}
        <Drawer.Screen
          name="settings/index"
          options={{
            drawerLabel: 'Configuración',
            title: 'Configuración',
            drawerIcon: ({ color, size }) => <Ionicons name="options-outline" size={size} color={color} />,
          }}
        />

        {/* ========================================================
            SUB-PANTALLAS OCULTAS (Para arreglar los nombres raros)
           ======================================================== */}
        
        {/* Configuración > Perfil */}
        <Drawer.Screen
          name="settings/profile"
          options={{
            drawerItemStyle: { display: 'none' }, // Oculto del menú
            title: 'Editar Perfil' // Título en el header
          }}
        />

        {/* Configuración > Vehículos */}
        <Drawer.Screen
          name="settings/vehicles"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Mis Vehículos'
          }}
        />

        {/* Configuración > Documentos */}
        <Drawer.Screen
          name="settings/documents"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Mis Documentos'
          }}
        />

        {/* Otras rutas internas que ya teníamos ocultas */}
        <Drawer.Screen
            name="earnings/withdraw"
            options={{ 
              drawerItemStyle: { display: 'none' },
              title: 'Retirar Fondos' 
            }}
        />
        <Drawer.Screen
            name="support/faq-details"
            options={{ 
              drawerItemStyle: { display: 'none' },
              title: 'Detalle de Ayuda'
            }}
        />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}