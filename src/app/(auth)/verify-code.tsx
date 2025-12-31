import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import CodeInput from '@/components/ui/CodeInput';
import Button from '@/components/ui/Button'; // NUEVO
import { Colors, Spacing, Typography } from '@/constants/theme'; // NUEVO

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyCode, loading } = useAuth();

  const handleComplete = async (code: string) => {
    if (code.length === 4 && phone) {
      const result = await verifyCode(phone, code);
      if (result.success) {
        // El Root layout se encargará de la redirección
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
                <Button 
                    title="Verificar" 
                    onPress={() => {
                        // El botón puede no hacer nada si el onComplete del input ya submite
                        // O puede forzar el submit si es necesario.
                    }} 
                    loading={loading}
                    fullWidth
                    gradient
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

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.base.white 
  },
  scrollContent: { 
    flexGrow: 1 
  },
  header: { 
    paddingHorizontal: Spacing.lg, 
    paddingTop: Spacing.sm 
  },
  backArrow: { 
    fontSize: Typography.size.xxl, 
    color: Colors.grey[800] 
  },
  mainContent: { 
    alignItems: 'center', 
    paddingHorizontal: Spacing.xl, 
    marginTop: Spacing.lg 
  },
  title: { 
    fontSize: Typography.size.xxl, 
    fontWeight: Typography.weight.bold, 
    color: Colors.brand.primary, 
    marginBottom: Spacing.md, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: Typography.size.base, 
    color: Colors.grey[600], 
    textAlign: 'center', 
    marginBottom: Spacing.xl 
  },
  codeContainer: { 
    marginBottom: Spacing.xl, 
    width: '100%' 
  },
  buttonWrapper: { 
    width: '100%', 
    marginBottom: Spacing.lg 
  },
  resendContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: Spacing.sm, 
    marginBottom: Spacing.lg 
  },
  resendText: { 
    fontWeight: Typography.weight.bold, 
    fontSize: Typography.size.sm, 
    color: Colors.brand.primary 
  },
  timerText: { 
    color: Colors.grey[500], 
    fontSize: Typography.size.sm 
  },
  privacyText: { 
    fontSize: Typography.size.xs, 
    color: Colors.grey[500], 
    textAlign: 'center', 
    maxWidth: 250, 
    marginTop: Spacing.lg 
  },
});
