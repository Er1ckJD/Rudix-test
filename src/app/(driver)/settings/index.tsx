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
import { useRouter, Stack, useNavigation } from 'expo-router'; // 1. Agregar useNavigation
import { DrawerActions } from '@react-navigation/native'; // 2. Agregar DrawerActions
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
import ListItem from '@/components/ui/ListItem';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DriverSettingsScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // 3. Inicializar navigation
  const { logout } = useAuth();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [navApp, setNavApp] = useState<'waze' | 'google'>('google');
  const [sound, setSound] = useState(true);

  const isDark = colorScheme === 'dark';
  
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
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen
        options={{
          title: 'Configuración',
          // headerBackTitle: 'Atrás', // Quita esto
          headerShadowVisible: false,
          headerStyle: { backgroundColor: isDark ? Colors.dark.surface : Colors.light.surface },
          headerTintColor: isDark ? Colors.dark.text : Colors.light.text,
          headerTitleStyle: {
            fontSize: Typography.size.lg,
            fontWeight: Typography.weight.semibold,
          },
          // 4. AGREGAR ESTO: Botón de menú explícito
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Ionicons
                name="menu" 
                size={24}
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      
      {/* ... (Resto del código idéntico) ... */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>Navegación</Text>
          <View style={[styles.card, isDark && styles.cardDark]}>
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
          <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>Preferencias de la App</Text>
          <View style={[styles.card, isDark && styles.cardDark]}>
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
                  value={isDark}
                  onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
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
          <Text style={[styles.sectionHeader, isDark && styles.sectionHeaderDark]}>Cuenta</Text>
          <View style={[styles.card, isDark && styles.cardDark]}>
            <ListItem
              isFirst
              icon="car-sport-outline"
              title="Gestionar Vehículos"
              onPress={() => router.push('/(driver)/settings/vehicles')}
              rightElement={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.itemValue, isDark && styles.itemValueDark]}>Nissan Versa</Text>
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
              onPress={() => router.push('/(driver)/settings/documents')}
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
              onPress={() => router.push('/(driver)/settings/profile')}
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

        <TouchableOpacity style={[styles.logoutBtn, isDark && styles.logoutBtnDark]} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color={Colors.semantic.error}
          />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={[styles.version, isDark && styles.versionDark]}>Versión 1.0.5 (Build 2025)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.surface,
  },
  containerDark: {
    backgroundColor: Colors.dark.background,
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
  sectionHeaderDark: {
    color: Colors.dark.textSecondary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: Colors.dark.surface,
  },
  itemValue: {
    fontSize: Typography.size.base,
    color: Colors.light.textSecondary,
    marginRight: Spacing.xs,
  },
  itemValueDark: {
    color: Colors.dark.textSecondary,
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
  logoutBtnDark: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.semantic.error,
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
  versionDark: {
    color: Colors.dark.textSecondary,
  },
});