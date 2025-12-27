import { Redirect } from 'expo-router';

// Este archivo es el guardián de la ruta '/'.
// Si alguien cae aquí, lo mandamos directo al Drawer.
export default function Index() {
  return <Redirect href="/(drawer)/(tabs)" />;
}