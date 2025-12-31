// Ejemplo: app/(auth)/login.tsx (Refactorizado)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Nuevos componentes del sistema de diseño
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

// Theme system
import { Colors, Spacing, Typography, CommonStyles } from '@/constants/theme';

// Hook
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading, error, clearError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validación
  const validateForm = (): boolean => {
    let isValid = true;

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('El correo es requerido');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Correo inválido');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validar password
    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // Manejar login
  const handleLogin = async () => {
    if (!validateForm()) return;

    clearError();
    const result = await login(email, password);
    
    if (result.success) {
      // La navegación la maneja automáticamente el _layout.tsx
      console.log('Login exitoso');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          
          {/* Logo / Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>¡Bienvenido de vuelta! 👋</Text>
            <Text style={styles.heroSubtitle}>
              Ingresa tus credenciales para continuar
            </Text>
          </View>

          {/* Form Card */}
          <Card variant="elevated" padding="lg">
            <Card.Content>
              
              {/* Email Input */}
              <Input
                label="Correo Electrónico"
                placeholder="tu@email.com"
                leftIcon="mail-outline"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                errorText={emailError}
                error={!!emailError}
              />

              {/* Password Input */}
              <Input
                label="Contraseña"
                placeholder="••••••••"
                leftIcon="lock-closed-outline"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError('');
                }}
                secureTextEntry
                errorText={passwordError}
                error={!!passwordError}
              />

              {/* Error general del backend */}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Forgot Password Link */}
              <Button
                title="¿Olvidaste tu contraseña?"
                variant="ghost"
                size="sm"
                onPress={() => router.push('/(auth)/forgot-password')}
                style={styles.forgotButton}
              />

              {/* Login Button */}
              <Button
                title="Iniciar Sesión"
                variant="primary"
                gradient
                fullWidth
                loading={loading}
                disabled={loading}
                onPress={handleLogin}
                leftIcon="log-in-outline"
              />

            </Card.Content>
          </Card>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O continúa con</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <Button
              title="Google"
              variant="outline"
              leftIcon="logo-google"
              onPress={() => console.log('Google login')}
              style={styles.socialButton}
            />
            <Button
              title="Facebook"
              variant="outline"
              leftIcon="logo-facebook"
              onPress={() => console.log('Facebook login')}
              style={styles.socialButton}
            />
          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <Button
              title="Regístrate"
              variant="ghost"
              size="sm"
              onPress={() => router.push('/(auth)/register')}
              style={styles.registerButton}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ============================================
// ESTILOS (Usando el theme system)
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },

  // Hero
  hero: {
    marginBottom: Spacing.xl,
    marginTop: Spacing.lg,
  },
  heroTitle: {
    ...CommonStyles.h1,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    ...CommonStyles.body,
    color: Colors.light.textSecondary,
  },

  // Error
  errorContainer: {
    backgroundColor: Colors.semantic.error + '15',
    padding: Spacing.md,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.semantic.error,
  },
  errorText: {
    color: Colors.semantic.error,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
  },

  // Forgot password
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grey[300],
  },
  dividerText: {
    ...CommonStyles.caption,
    marginHorizontal: Spacing.md,
  },

  // Social buttons
  socialButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  socialButton: {
    flex: 1,
  },

  // Register
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    ...CommonStyles.body,
    color: Colors.light.textSecondary,
  },
  registerButton: {
    marginLeft: -Spacing.sm, // Compensar padding del botón
  },
});
