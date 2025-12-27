import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '@/components/ui/AuthButton';
import { Colors } from '@/constants/theme';

export default function OnboardingComfortScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Placeholder de la imagen de fondo oscura */}
      <View style={styles.backgroundPlaceholder}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              {/* Indicadores: El tercero es el activo */}
              <View style={styles.indicatorContainer}>
                <View style={styles.indicator} />
                <View style={styles.indicator} />
                <View style={[styles.indicator, styles.indicatorActive]} />
              </View>
              
              <Text style={styles.title}>Donde viajar se siente bien</Text>
              <Text style={styles.subtitle}>Disfruta de viajes cómodos y un servicio de calidad superior en cada trayecto.</Text>
            </View>

            <View style={styles.buttonContainer}>
              <AuthButton
                title="Continuar"
                // Al terminar el onboarding, vamos a la pantalla de opciones de login
                onPress={() => router.replace('/auth/login-options')} 
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundPlaceholder: { flex: 1, backgroundColor: '#2a2a2a' }, // Un tono ligeramente distinto
  safeArea: { flex: 1 },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  textContainer: { marginBottom: 40 },
  indicatorContainer: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  indicatorActive: { width: 24, backgroundColor: Colors.light.primary },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#ccc', lineHeight: 24 },
  buttonContainer: { width: '100%' },
});