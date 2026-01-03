// src/app/(driver)/settings/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import ListItem from '@/components/ui/ListItem'; // Import the new component

export default function DriverSettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [navApp, setNavApp] = useState<'waze' | 'google'>('google');
  const [sound, setSound] = useState(true);
  const [nightMode, setNightMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Configuración',
          headerBackTitle: 'Atrás',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.surface },
          headerTintColor: Colors.light.text,
          headerTitleStyle: {
            fontSize: Typography.size.lg,
            fontWeight: Typography.weight.semibold,
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Navegación</Text>
          <View style={styles.card}>
            <ListItem
              isFirst
              icon="map-outline"
              title="Google Maps"
              onPress={() => setNavApp('google')}
              rightElement={
                navApp === 'google' ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={Colors.brand.primary}
                  />
                ) : undefined
              }
            />
            <ListItem
              isLast
              icon="logo-waze"
              title="Waze"
              onPress={() => setNavApp('waze')}
              rightElement={
                navApp === 'waze' ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={Colors.brand.primary}
                  />
                ) : undefined
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferencias de la App</Text>
          <View style={styles.card}>
            <ListItem
              isFirst
              icon="volume-medium-outline"
              title="Sonidos de alerta"
              rightElement={
                <Switch
                  value={sound}
                  onValueChange={setSound}
                  trackColor={{
                    false: Colors.grey[300],
                    true: Colors.brand.primary,
                  }}
                  thumbColor={Colors.base.white}
                />
              }
            />
            <ListItem
              isLast
              icon="moon-outline"
              title="Modo Nocturno (Mapa)"
              rightElement={
                <Switch
                  value={nightMode}
                  onValueChange={setNightMode}
                  trackColor={{
                    false: Colors.grey[300],
                    true: Colors.brand.primary,
                  }}
                  thumbColor={Colors.base.white}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Cuenta</Text>
          <View style={styles.card}>
            <ListItem
              isFirst
              icon="car-sport-outline"
              title="Gestionar Vehículos"
              onPress={() => {
                /* Implementar navegación */
              }}
              rightElement={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.itemValue}>Nissan Versa</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.grey[400]}
                  />
                </View>
              }
            />
            <ListItem
              icon="document-text-outline"
              title="Documentos"
              onPress={() => {
                /* Implementar navegación */
              }}
              rightElement={
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.grey[400]}
                />
              }
            />
            <ListItem
              isLast
              icon="person-outline"
              title="Editar Perfil"
              onPress={() => {
                /* Implementar navegación */
              }}
              rightElement={
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.grey[400]}
                />
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color={Colors.semantic.error}
          />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Versión 1.0.5 (Build 2025)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.surface,
  },
  scrollContainer: {
    padding: Spacing.lg,
  },
  sectionHeader: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
    overflow: 'hidden', // Ensures the list item corners are rounded
  },
  itemValue: {
    fontSize: Typography.size.base,
    color: Colors.light.textSecondary,
    marginRight: Spacing.xs,
  },
  logoutBtn: {
    marginTop: Spacing.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.semantic.error,
    ...Shadows.sm,
    gap: Spacing.sm,
  },
  logoutText: {
    color: Colors.semantic.error,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.base,
  },
  version: {
    textAlign: 'center',
    color: Colors.light.textSecondary,
    fontSize: Typography.size.sm,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
});