import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomTextInput from '@/components/ui/CustomTextInput';
import AuthButton from '@/components/ui/AuthButton';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/theme';

const schema = z.object({
  phone: z.string().length(10, "El número debe tener 10 dígitos").regex(/^\d+$/, "Solo números"),
});

type FormData = z.infer<typeof schema>;

export default function PhoneInputScreen() {
  const router = useRouter();
  const { verifyPhone, loading } = useAuth();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await verifyPhone(data.phone);
    if (result.success) {
      router.push({ pathname: '/auth/verify-code', params: { phone: data.phone } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
          </View>

          <Text style={styles.title}>Ingresa tú número telefónico</Text>
          <Text style={styles.description}>
            Para garantizar tu seguridad y la correcta asignación de los viajes, requerimos la verificación del número celular
          </Text>

          {/* Placeholder para el ícono del teléfono */}
          <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>ICON</Text>
          </View>

          <View style={styles.inputContainer}>
              <CustomTextInput
                  control={control}
                  name="phone"
                  placeholder="Tu número celular (10 dígitos)"
                  keyboardType="phone-pad"
              />
          </View>

          <AuthButton
            title="Enviar código"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />

          <Text style={styles.footerNote}>
            Al presionar &apos;Enviar código&apos; recibirás un mensaje de texto para confirmar tu identidad.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoiding: { flex: 1 },
  content: { flexGrow: 1, padding: 30, alignItems: 'center' },
  header: { alignSelf: 'flex-start', marginBottom: 10 },
  backArrow: { fontSize: 30, color: '#333' },
    title: { fontSize: 22, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginBottom: 10 },
    description: { fontSize: 12, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 18 },
    iconPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F5E9', // Verde muy claro
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.light.primary
    },
    iconText: { color: Colors.light.primary, fontWeight: 'bold' },  inputContainer: { width: '100%', marginBottom: 30 },
  footerNote: { fontSize: 10, color: '#999', textAlign: 'center', marginTop: 20 },
});