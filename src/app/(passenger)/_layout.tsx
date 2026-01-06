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
          drawerStyle: { width: '75%', backgroundColor: '#fff' },
        }}
      >
        {/* === PANTALLAS PRINCIPALES === */}

        <Drawer.Screen
          name="(home)" 
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />

        {/* 'ride' tiene su propio _layout, así que el nombre es solo la carpeta */}
        <Drawer.Screen
          name="ride"
          options={{ drawerItemStyle: { display: 'none' } }} 
        />

        <Drawer.Screen
          name="fidelity/index" // Fidelity NO tiene layout, así que /index es correcto
          options={{
            drawerLabel: 'Fidelity',
            title: 'RuDix Fidelity',
            drawerIcon: ({ color, size }) => <Ionicons name="shield-checkmark-outline" size={size} color={color} />,
          }}
        />

        <Drawer.Screen
          name="notifications/index"
          options={{
            drawerLabel: 'Notificaciones',
            title: 'Notificaciones',
            drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
          }}
        />

        {/* 'profile' tiene layout propio */}
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Mi Perfil',
            title: 'Mi Perfil',
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />

        {/* AQUÍ ESTABA EL PROBLEMA: safety/index explícito */}
        <Drawer.Screen
          name="safety/index"
          options={{
            drawerLabel: 'Seguridad',
            title: 'Seguridad',
            drawerIcon: ({ color, size }) => <Ionicons name="shield-outline" size={size} color={color} />,
          }}
        />

        <Drawer.Screen
          name="settings/index"
          options={{
            drawerLabel: 'Configuración',
            title: 'Configuración',
            drawerIcon: ({ color, size }) => <Ionicons name="options-outline" size={size} color={color} />,
          }}
        />

        {/* AQUÍ ESTABA EL OTRO PROBLEMA: support/index explícito */}
        <Drawer.Screen
          name="support/index"
          options={{
            drawerLabel: 'Soporte',
            title: 'Centro de Soporte',
            drawerIcon: ({ color, size }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
          }}
        />

        {/* === PANTALLAS OCULTAS (Sub-páginas) === */}
        {/* Esto evita que aparezca "safety\contacts" en el menú */}
        <Drawer.Screen
          name="safety/contacts"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Contactos de Confianza',
          }}
        />

        {/* Esto evita que aparezca "support\faqs" en el menú */}
        <Drawer.Screen
          name="support/faqs"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Preguntas Frecuentes',
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}