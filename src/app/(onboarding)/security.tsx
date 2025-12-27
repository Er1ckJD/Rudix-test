import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '@/components/ui/AuthButton';
import { Colors } from '@/constants/theme';

export default function OnboardingSecurityScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Placeholder de la imagen de fondo oscura */}
      <View style={styles.backgroundPlaceholder}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              {/* Indicadores: El segundo es el activo */}
              <View style={styles.indicatorContainer}>
                <View style={styles.indicator} />
                <View style={[styles.indicator, styles.indicatorActive]} />
                <View style={styles.indicator} />
              </View>
              
              <Text style={styles.title}>Tu seguridad, nuestro motor</Text>
              <Text style={styles.subtitle}>Viaja con confianza. Conductores verificados y soporte 24/7 para tu tranquilidad.</Text>
            </View>

            <View style={styles.buttonContainer}>
              <AuthButton
                title="Continuar"
                onPress={() => router.push('/(onboarding)/comfort')}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

// Estilos compartidos (puedes refactorizar esto a un archivo de estilos común después)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backgroundPlaceholder: { flex: 1, backgroundColor: '#222' }, // Simula fondo oscuro
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
  indicatorActive: { width: 24, backgroundColor: Colors.light.primary }, // Verde activo
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#ccc', lineHeight: 24 },
  buttonContainer: { width: '100%' },
});