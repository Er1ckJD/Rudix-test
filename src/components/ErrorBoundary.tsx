// src/components/ErrorBoundary.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';
import { Ionicons } from '@expo/vector-icons';
import Button from './ui/Button';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { isProduction } from '@/config/env';

// ============================================ 
// TYPES
// ============================================ 
interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// ============================================ 
// ERROR BOUNDARY COMPONENT
// ============================================ 
export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Pick<State, 'hasError' | 'error'> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Loggear el error a un servicio de monitoreo (e.g., Sentry)
    // Solo en producción para no generar ruido en desarrollo
    if (isProduction) {
      // Sentry.captureException(error);
    }
    
    // También loguear en consola para debug en desarrollo
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRestart = () => {
    if (isProduction) {
      // Forzar una actualización de la app
      Updates.reloadAsync();
    } else {
      // En desarrollo, simplemente reseteamos el estado para reintentar
      this.setState({ hasError: false, error: null, errorInfo: null });
    }
  };
  
  private handleReport = () => {
    // Aquí se podría abrir un modal para que el usuario envíe un reporte
    // o simplemente loguear la intención.
    console.log("User reported error:", this.state.error);
    alert("Gracias por tu reporte. El equipo ha sido notificado.");
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Ionicons
              name="bug-outline"
              size={64}
              color={Colors.semantic.error}
              style={styles.icon}
            />
            <Text style={styles.title}>¡Oops! Algo salió mal</Text>
            <Text style={styles.subtitle}>
              Hemos registrado el error. Por favor, reinicia la aplicación.
            </Text>
            
            {/* Mostrar detalles del error solo en desarrollo */}
            {!isProduction && this.state.error && (
              <ScrollView style={styles.errorContainer}>
                <Text style={styles.errorTitle}>Detalles del Error (Solo Dev):</Text>
                <Text selectable style={styles.errorText}>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </Text>
              </ScrollView>
            )}
            
            <View style={styles.buttonContainer}>
              <Button
                title="Reportar Error"
                variant="secondary"
                size="md"
                onPress={this.handleReport}
                leftIcon="warning-outline"
              />
              <Button
                title={isProduction ? 'Reiniciar App' : 'Reintentar'}
                variant="primary"
                size="md"
                onPress={this.handleRestart}
                leftIcon="refresh-outline"
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

// ============================================ 
// STYLES
// ============================================ 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  icon: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  errorContainer: {
    maxHeight: 200,
    width: '100%',
    backgroundColor: Colors.grey[100],
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  errorTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.semantic.error,
    marginBottom: Spacing.xs,
  },
  errorText: {
    fontSize: Typography.size.xs,
    color: Colors.light.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
});