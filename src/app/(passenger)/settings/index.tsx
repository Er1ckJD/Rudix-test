// src/app/(passenger)/settings/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';

interface SettingItem {
  id: string;
  section: 'cuenta' | 'preferencias' | 'avanzado';
  icon: string;
  title: string;
  subtitle?: string;
  type: 'navigation' | 'toggle' | 'action';
  route?: string;
  value?: boolean;
  onToggle?: (value: boolean) => void;
  badge?: string;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Estados de los toggles
  const [notifications, setNotifications] = useState(true);
  const [ubicacionDeterminada, setUbicacionDeterminada] = useState(false);
  const [accesibilidad, setAccesibilidad] = useState(false);

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
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción es permanente y no se puede deshacer. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // Lógica para eliminar cuenta
            console.log('Eliminar cuenta');
          },
        },
      ]
    );
  };

  const SETTINGS: SettingItem[] = [
    // CUENTA
    {
      id: 'profile',
      section: 'cuenta',
      icon: 'person-circle',
      title: 'Perfil',
      subtitle: 'Editar información personal',
      type: 'navigation',
      route: '/profile',
    },
    {
      id: 'payment',
      section: 'cuenta',
      icon: 'card',
      title: 'Métodos de pago',
      subtitle: 'Gestionar tarjetas y pagos',
      type: 'navigation',
      route: '/profile/payment-methods',
    },
    {
      id: 'fidelity',
      section: 'cuenta',
      icon: 'shield-checkmark',
      title: 'RuDix Fidelity',
      subtitle: 'Ver tu nivel y beneficios',
      type: 'navigation',
      route: '/(passenger)/fidelity',
      badge: 'Fidelity Plus',
    },
    // PREFERENCIAS
    {
      id: 'notifications',
      section: 'preferencias',
      icon: 'notifications',
      title: 'Notificaciones',
      subtitle: 'Gestionar alertas',
      type: 'toggle',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      id: 'ubicacion',
      section: 'preferencias',
      icon: 'location',
      title: 'Ubicación determinada',
      subtitle: 'Compartir ubicación precisa',
      type: 'toggle',
      value: ubicacionDeterminada,
      onToggle: setUbicacionDeterminada,
    },
    {
      id: 'accesibilidad',
      section: 'preferencias',
      icon: 'accessibility',
      title: 'Accesibilidad',
      subtitle: 'Opciones de accesibilidad',
      type: 'toggle',
      value: accesibilidad,
      onToggle: setAccesibilidad,
    },
    // AVANZADO
    {
      id: 'privacy',
      section: 'avanzado',
      icon: 'shield-checkmark',
      title: 'Privacidad y seguridad',
      subtitle: 'Controlar tu información',
      type: 'navigation',
      route: '/(passenger)/safety',
    },
    {
      id: 'cache',
      section: 'avanzado',
      icon: 'trash',
      title: 'Limpiar caché',
      subtitle: 'Liberar espacio de almacenamiento',
      type: 'action',
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    if (item.type === 'navigation') {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.settingItem}
          onPress={() => item.route && router.push(item.route as any)}
        >
          <View style={styles.settingIcon}>
            <Ionicons name={item.icon as any} size={20} color={Colors.brand.primary} />
          </View>
          <View style={styles.settingContent}>
            <View style={styles.settingHeader}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </View>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
        </TouchableOpacity>
      );
    }

    if (item.type === 'toggle') {
      return (
        <View key={item.id} style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name={item.icon as any} size={20} color={Colors.brand.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: Colors.grey[300], true: Colors.brand.primary }}
            thumbColor={Colors.base.white}
          />
        </View>
      );
    }

    if (item.type === 'action') {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.settingItem}
          onPress={() => {
            if (item.id === 'cache') {
              Alert.alert('Caché limpiado', 'Se ha liberado el espacio correctamente.');
            }
          }}
        >
          <View style={styles.settingIcon}>
            <Ionicons name={item.icon as any} size={20} color={Colors.brand.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const cuentaSettings = SETTINGS.filter((s) => s.section === 'cuenta');
  const preferenciasSettings = SETTINGS.filter((s) => s.section === 'preferencias');
  const avanzadoSettings = SETTINGS.filter((s) => s.section === 'avanzado');

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#108A33', '#15B545']} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="menu" size={28} color={Colors.base.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuración</Text>
        </LinearGradient>

        {/* Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => router.push('/profile')}
          activeOpacity={0.8}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>
              {user?.nombres?.[0]}{user?.apellidos?.[0]}
            </Text>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check" size={12} color={Colors.base.white} />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.nombres || 'Usuario'} {user?.apellidos || ''}
            </Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={14}
                  color="#FBC02D"
                />
              ))}
              <Text style={styles.ratingText}>5.0 (11)</Text>
            </View>
            <View style={styles.fidelityBadge}>
              <Text style={styles.fidelityText}>Fidelity Plus</Text>
            </View>
          </View>
          <Ionicons name="create-outline" size={24} color={Colors.brand.primary} />
        </TouchableOpacity>

        {/* Cuenta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CUENTA</Text>
          {cuentaSettings.map(renderSettingItem)}
        </View>

        {/* Preferencias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
          {preferenciasSettings.map(renderSettingItem)}
        </View>

        {/* Avanzado */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AVANZADO</Text>
          {avanzadoSettings.map(renderSettingItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={Colors.semantic.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Eliminar cuenta</Text>
        </TouchableOpacity>

        {/* Footer Logo */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>RuDix</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  backButton: {
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
  profileCard: {
    backgroundColor: Colors.base.white,
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.xl,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.lg,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    position: 'relative',
  },
  profileInitials: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.base.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.size.sm,
    color: Colors.grey[600],
    marginLeft: Spacing.xs,
  },
  fidelityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  fidelityText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.brand.primary,
  },
  section: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.grey[600],
    marginBottom: Spacing.sm,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.brand.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  settingTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.medium,
    color: Colors.light.text,
  },
  badge: {
    backgroundColor: Colors.brand.primary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginLeft: Spacing.sm,
  },
  badgeText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: Colors.brand.primary,
  },
  settingSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.grey[600],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.base.white,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.semantic.error + '30',
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.semantic.error,
  },
  deleteText: {
    fontSize: Typography.size.sm,
    color: Colors.grey[500],
    textAlign: 'center',
    marginTop: Spacing.lg,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  footerLogo: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.black,
    color: Colors.light.text,
    letterSpacing: 1,
  },
});