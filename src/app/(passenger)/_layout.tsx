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
        {/* 1. Inicio */}
        <Drawer.Screen
          name="(home)" 
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        
        {/* 2. Viaje (Tiene layout propio, así que "ride" está bien) */}
        <Drawer.Screen
          name="ride"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />

        {/* 3. Fidelidad (Si no tiene layout interno, usa fidelity/index) */}
        <Drawer.Screen
          name="fidelity/index"
          options={{
            drawerLabel: 'Fidelity',
            title: 'RuDix Fidelity',
            drawerIcon: ({ color, size }) => <Ionicons name="shield-checkmark-outline" size={size} color={color} />,
          }}
        />

        {/* 4. Notificaciones */}
        <Drawer.Screen
          name="notifications/index"
          options={{
            drawerLabel: 'Notificaciones',
            title: 'Notificaciones',
            drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
          }}
        />

        {/* 5. Perfil (Tiene layout propio, "profile" está bien) */}
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Mi Perfil',
            title: 'Mi Perfil',
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />

        {/* 6. Seguridad (CORREGIDO) */}
        <Drawer.Screen
          name="safety/index" // Apuntamos al archivo principal
          options={{
            drawerLabel: 'Seguridad',
            title: 'Seguridad',
            drawerIcon: ({ color, size }) => <Ionicons name="shield-outline" size={size} color={color} />,
          }}
        />

        {/* 7. Configuración */}
        <Drawer.Screen
          name="settings/index"
          options={{
            drawerLabel: 'Configuración',
            title: 'Configuración',
            drawerIcon: ({ color, size }) => <Ionicons name="options-outline" size={size} color={color} />,
          }}
        />

        {/* 8. Soporte (CORREGIDO) */}
        <Drawer.Screen
          name="support/index" // Apuntamos al archivo principal
          options={{
            drawerLabel: 'Soporte',
            title: 'Centro de Soporte',
            drawerIcon: ({ color, size }) => <Ionicons name="help-buoy-outline" size={size} color={color} />,
          }}
        />

        {/* =========================================================
            OCULTAR RUTAS SECUNDARIAS (LO QUE FALTABA)
           ========================================================= */}
        
        {/* Ocultar Contactos de Seguridad */}
        <Drawer.Screen
          name="safety/contacts"
          options={{
            drawerItemStyle: { display: 'none' }, // Esto lo quita del menú
            title: 'Contactos de Confianza'
          }}
        />

        {/* Ocultar FAQs de Soporte */}
        <Drawer.Screen
          name="support/faqs"
          options={{
            drawerItemStyle: { display: 'none' }, // Esto lo quita del menú
            title: 'Preguntas Frecuentes'
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}