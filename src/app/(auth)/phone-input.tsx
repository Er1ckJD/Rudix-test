import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form'; // Import Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';

// Nuevos componentes del sistema de diseño
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors, Spacing, Typography } from '@/constants/theme';

const schema = z.object({
  phone: z.string().length(10, "El número debe tener 10 dígitos").regex(/^\d+$/, "Solo números"),
});

type FormData = z.infer<typeof schema>;

export default function PhoneInputScreen() {
  const router = useRouter();
  const { verifyPhone, loading } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    const result = await verifyPhone(data.phone);
    if (result.success) {
      router.push({ pathname: '/(auth)/verify-code', params: { phone: data.phone } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
          </View>

          <Text style={styles.title}>Ingresa tu número telefónico</Text>
          <Text style={styles.description}>
            Para garantizar tu seguridad y la correcta asignación de los viajes, requerimos la verificación del número celular.
          </Text>

          <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>ICON</Text>
          </View>

          <View style={styles.inputContainer}>
              <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                          placeholder="Tu número celular (10 dígitos)"
                          keyboardType="phone-pad"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          error={!!errors.phone}
                          errorText={errors.phone?.message}
                          leftIcon="call-outline"
                      />
                  )}
              />
          </View>

          <Button
            title="Enviar código"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            fullWidth
            gradient
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
  container: { 
    flex: 1, 
    backgroundColor: Colors.base.white 
  },
  keyboardAvoiding: { 
    flex: 1 
  },
  content: { 
    flexGrow: 1, 
    padding: Spacing.lg, 
    alignItems: 'center' 
  },
  header: { 
    alignSelf: 'flex-start', 
    marginBottom: Spacing.md 
  },
  backArrow: { 
    fontSize: Typography.size.xxl, 
    color: Colors.grey[800] 
  },
  title: { 
    fontSize: Typography.size.xl, 
    fontWeight: Typography.weight.bold, 
    color: Colors.brand.primary, 
    textAlign: 'center', 
    marginBottom: Spacing.md 
  },
  description: { 
    fontSize: Typography.size.sm, 
    color: Colors.grey[600], 
    textAlign: 'center', 
    marginBottom: Spacing.xl, 
    lineHeight: Typography.size.sm * 1.5 
  },
  iconPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: Colors.brand.primary + '15',
      marginBottom: Spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: Colors.brand.primary
  },
  iconText: { 
    color: Colors.brand.primary, 
    fontWeight: Typography.weight.bold 
  },  
  inputContainer: { 
    width: '100%', 
    marginBottom: Spacing.lg 
  },
  footerNote: { 
    fontSize: Typography.size.xs, 
    color: Colors.grey[500], 
    textAlign: 'center', 
    marginTop: Spacing.md 
  },
});
