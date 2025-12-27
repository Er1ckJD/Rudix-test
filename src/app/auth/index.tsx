import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '@/components/ui/AuthButton';
import { Colors } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Fondo sólido simulando la imagen oscura */}
      <View style={styles.backgroundPlaceholder}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <View style={styles.indicatorContainer}>
                <View style={[styles.indicator, styles.indicatorActive]} />
                <View style={styles.indicator} />
                <View style={styles.indicator} />
              </View>
              
              <Text style={styles.title}>BIENVENIDO</Text>
              <Text style={styles.subtitle}>RuDix: Tu viaje seguro empieza aquí</Text>
            </View>

            <View style={styles.buttonContainer}>
              <AuthButton
                title="Continuar"
                onPress={() => router.push('/(onboarding)/security')}
              />
            </View>

            <Text style={styles.footerText}>
              RuDix Privacy Policy and Terms of Use
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.common.black },
  backgroundPlaceholder: { flex: 1, backgroundColor: Colors.grey[1500] }, // Gris oscuro simulando foto
  safeArea: { flex: 1 },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  textContainer: { marginBottom: 30 },
  indicatorContainer: { flexDirection: 'row', gap: 5, marginBottom: 15 },
  indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  indicatorActive: { width: 20, backgroundColor: Colors.common.white },
  title: { fontSize: 36, fontWeight: 'bold', color: Colors.common.white, textTransform: 'uppercase' },
  subtitle: { fontSize: 16, color: Colors.grey[800], marginTop: 5 },
  buttonContainer: { width: '100%', marginBottom: 20 },
  footerText: { color: 'rgba(255,255,255,0.5)', fontSize: 10, textAlign: 'center' },
});