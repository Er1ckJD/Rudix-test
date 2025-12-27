import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function DriverHomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen 
          name="index" 
          options={{ 
            drawerLabel: 'Inicio', // Nombre en el menú
            title: 'Inicio',
          }} 
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}