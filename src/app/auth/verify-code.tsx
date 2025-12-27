import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import CodeInput from '@/components/ui/CodeInput';
import AuthButton from '@/components/ui/AuthButton';
import { Colors } from '@/constants/theme';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyCode, loading } = useAuth();

  const handleComplete = async (code: string) => {
    if (code.length === 4 && phone) {
      const result = await verifyCode(phone, code);
      if (result.success) {
        router.replace('/');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
            <Text style={styles.title}>Código de Verificación</Text>
            <Text style={styles.subtitle}>
            Ingresa el código de 4 dígitos que enviamos a tu número
            </Text>

            <View style={styles.codeContainer}>
                <CodeInput length={4} onComplete={handleComplete} />
            </View>

            <View style={styles.buttonWrapper}>
                {/* Puedes poner un onPress vacío si el CodeInput maneja el envío automático */}
                <AuthButton 
                    title="Verificar" 
                    onPress={() => {}} 
                    loading={loading} 
                />
            </View>

            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Reenviar código</Text>
                <Text style={styles.timerText}>60 segundos</Text>
            </View>
             
            <Text style={styles.privacyText}>
                Tu información está protegida bajo nuestras políticas de privacidad.
            </Text>
        </View>

        {/* Espacio inferior vacío (donde iría el auto) */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 },
  header: { paddingHorizontal: 20, paddingTop: 10 },
  backArrow: { fontSize: 30, color: '#333' },
  mainContent: { alignItems: 'center', paddingHorizontal: 30, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 40 },
  codeContainer: { marginBottom: 30, width: '100%' },
  buttonWrapper: { width: '100%', marginBottom: 20 },
  resendContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, marginBottom: 20 },
  resendText: { fontWeight: 'bold', fontSize: 12, color: Colors.light.primary },
  timerText: { color: '#999', fontSize: 12 },
  privacyText: { fontSize: 10, color: '#999', textAlign: 'center', maxWidth: 200, marginTop: 20 },
});