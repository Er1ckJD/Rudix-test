import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button'; // NUEVO
import { Colors, Spacing } from '@/constants/theme'; // NUEVO

export default function LoginOptionsScreen() {
  const router = useRouter();

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    console.log(`Attempting login with ${provider}`);
    // En un entorno real, aquí iría la lógica de login social.
    // Para la demo, el login de Facebook usa el mock.
    if (provider === 'facebook' && __DEV__ && (global as any).mockLogin) {
      try {
        await (global as any).mockLogin();
        // La navegación la maneja el Root layout
      } catch (error) {
        console.error("Error in simulated login:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Placeholder para la ilustración */}
        <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Ilustración Aquí</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>¡Bienvenido a RuDix!</Text>
          <Text style={styles.subtitle}>Confort y Seguridad en cada kilómetro</Text>

          <View style={styles.buttonsContainer}>
            {/* Botón principal refactorizado */}
            <Button
              title="Entrar con mi número celular"
              variant="primary"
              onPress={() => router.push('/(auth)/phone-input')}
              fullWidth
              gradient
            />
            
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>O continúa con</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Botones sociales refactorizados */}
            <Button
              title="Continuar con Google"
              variant="outline"
              leftIcon="logo-google"
              onPress={() => handleSocialLogin('google')}
              fullWidth
              style={styles.socialButton}
              textStyle={styles.socialButtonText}
            />
            <Button
              title="Continuar con Apple"
              variant="primary"
              leftIcon="logo-apple"
              onPress={() => handleSocialLogin('apple')}
              fullWidth
              style={{ backgroundColor: Colors.base.black }}
            />
             <Button
              title="Continuar con Facebook"
              variant="primary"
              leftIcon="logo-facebook"
              onPress={() => handleSocialLogin('facebook')}
              fullWidth
              style={{ backgroundColor: Colors.social.facebook }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white },
  scrollContent: { 
    flexGrow: 1, 
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.2,
    backgroundColor: Colors.grey[100],
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  placeholderText: { color: Colors.grey[500] },
  formContainer: { 
    width: '100%', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: Colors.light.text, 
    marginBottom: Spacing.sm 
  },
  subtitle: { 
    fontSize: 14, 
    color: Colors.light.textSecondary, 
    marginBottom: Spacing.xl 
  },
  buttonsContainer: { 
    width: '100%', 
    gap: Spacing.md 
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey[200],
  },
  dividerText: {
    color: Colors.grey[500],
    marginHorizontal: Spacing.md,
  },
  socialButton: {
    backgroundColor: Colors.base.white,
    borderColor: Colors.grey[300],
    borderWidth: 1,
  },
  socialButtonText: {
    color: Colors.light.text,
  }
});
