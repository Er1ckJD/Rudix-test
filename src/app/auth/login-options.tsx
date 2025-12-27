import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '@/components/ui/AuthButton';
import SocialAuthButtons from '@/components/ui/SocialAuthButtons';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

export default function LoginOptionsScreen() {
  const router = useRouter();
  const { mockLogin } = useAuth(); // Get mockLogin from useAuth

  const handleFacebookLogin = async () => {
    if (!mockLogin) {
        console.error("mockLogin is not available in production");
        return;
    }
    try {
      // 1. Ejecutar el login simulado
      await mockLogin();
      
      // 2. Navegar MANUALMENTE al drawer para asegurar que no se quede trabado
      // Usamos 'replace' para que no pueda volver atrás al login con el botón 'atrás'
      router.replace('/(drawer)/(tabs)'); 
    } catch (error) {
      console.error("Error en login simulado:", error);
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
          <Text style={styles.title}>¡Registrate a RuDix!</Text>
          <Text style={styles.subtitle}>Confort y Seguridad en cada kilómetro</Text>

          <View style={styles.buttonsGap}>
            <AuthButton
              title="Entrar con mi número celular"
              onPress={() => router.push('/auth/phone-input')}
            />

            <SocialAuthButtons
              onGoogle={() => console.log('Google')}
              onFacebook={handleFacebookLogin} // Use the new handler
              onApple={() => console.log('Apple')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, paddingBottom: 20, alignItems: 'center' },
  imagePlaceholder: {
    width: '80%',
    height: '30%',
    backgroundColor: '#E0E0E0', // Gris claro
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: { color: '#888' },
  formContainer: { width: '100%', paddingHorizontal: 30, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 30 },
  buttonsGap: { width: '100%', gap: 15 },
});