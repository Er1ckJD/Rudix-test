import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegistrationTimeline from '@/components/driver/RegistrationTimeline';

export default function DriverSuccessScreen() {
  const router = useRouter();

  const timelineSteps = [
    {
      icon: 'document-text-outline' as const,
      title: '¡Documentación arriba!',
      description: 'Se revisará la información otorgada',
      status: 'completed' as const,
    },
    {
      icon: 'navigate-outline' as const,
      title: 'Configuración de viajes',
      description: 'Podrás realizar y aceptar viajes posterior a la verificación',
      status: 'pending' as const,
    },
    {
      icon: 'checkmark-circle-outline' as const,
      title: 'Verificación lista',
      description: 'En un transcurso de 24 horas se notificará la verificación',
      status: 'pending' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Genial!</Text>
      
      {/* Imagen conductor */}
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <Text style={styles.subtitle}>Sigamos configurando</Text>

      <RegistrationTimeline steps={timelineSteps} />

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(driver)/home')}>
            <Text style={styles.btnText}>Ir al Panel de Conductor</Text>
            <Ionicons name="car-sport" size={20} color={Colors.base.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: Colors.brand.primary, marginBottom: 20 },
  image: { width: 150, height: 120, marginBottom: 30 },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: Colors.brand.primary, marginBottom: 30 },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});