import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/navigation/CustomDrawerContent';


export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        // @ts-ignore
        id="MyDrawer"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // Ocultamos el header default del drawer
          drawerType: 'front', // El drawer se desliza sobre el contenido
          drawerStyle: {
            width: '75%', // Ancho del menú
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        {/* Aquí definimos que la pantalla principal es el grupo (tabs) */}
        <Drawer.Screen
          name="security" // El nombre del archivo sin extensión
          options={{
            drawerLabel: () => null, // Oculta el texto
            title: null,
            drawerItemStyle: { display: 'none' } // Oculta el ítem completamente del menú visual
          }}
        />
        <Drawer.Screen
          name="(tabs)" 
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
