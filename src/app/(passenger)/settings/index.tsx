// src/app/(passenger)/settings/index.tsx
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import ListItem from '@/components/ui/ListItem'; // Import the new component

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
      ],
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
      ],
    );
  };

  const renderChevron = () => (
    <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.brand.primary, Colors.brand.primaryLight]}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
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
              {user?.nombres?.[0]}
              {user?.apellidos?.[0]}
            </Text>
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons
                name="check"
                size={12}
                color={Colors.base.white}
              />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.nombres || 'Usuario'} {user?.apellidos || ''}
            </Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={14} color="#FBC02D" />
              ))}
              <Text style={styles.ratingText}>5.0 (11)</Text>
            </View>
            <View style={styles.fidelityBadge}>
              <Text style={styles.fidelityText}>Fidelity Plus</Text>
            </View>
          </View>
          <Ionicons
            name="create-outline"
            size={24}
            color={Colors.brand.primary}
          />
        </TouchableOpacity>

        {/* Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CUENTA</Text>
          <View style={styles.card}>
            <ListItem
              isFirst
              icon="person-circle-outline"
              title="Perfil"
              subtitle="Editar información personal"
              onPress={() => router.push('/profile')}
              rightElement={renderChevron()}
            />
            <ListItem
              icon="card-outline"
              title="Métodos de pago"
              subtitle="Gestionar tarjetas y pagos"
              onPress={() => router.push('/profile/payment-methods')}
              rightElement={renderChevron()}
            />
            <ListItem
              isLast
              icon="shield-checkmark-outline"
              title="RuDix Fidelity"
              subtitle="Ver tu nivel y beneficios"
              onPress={() => router.push('/(passenger)/fidelity')}
              rightElement={renderChevron()}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
          <View style={styles.card}>
            <ListItem
              isFirst
              icon="notifications-outline"
              title="Notificaciones"
              subtitle="Gestionar alertas"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{
                    false: Colors.grey[300],
                    true: Colors.brand.primary,
                  }}
                  thumbColor={Colors.base.white}
                />
              }
            />
            <ListItem
              icon="location-outline"
              title="Ubicación determinada"
              subtitle="Compartir ubicación precisa"
              rightElement={
                <Switch
                  value={ubicacionDeterminada}
                  onValueChange={setUbicacionDeterminada}
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
              icon="accessibility-outline"
              title="Accesibilidad"
              subtitle="Opciones de accesibilidad"
              rightElement={
                <Switch
                  value={accesibilidad}
                  onValueChange={setAccesibilidad}
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
          <Text style={styles.sectionTitle}>AVANZADO</Text>
          <View style={styles.card}>
            <ListItem
              isFirst
              icon="shield-outline"
              title="Privacidad y seguridad"
              subtitle="Controlar tu información"
              onPress={() => router.push('/(passenger)/safety')}
              rightElement={renderChevron()}
            />
            <ListItem
              isLast
              icon="trash-outline"
              title="Limpiar caché"
              subtitle="Liberar espacio de almacenamiento"
              onPress={() =>
                Alert.alert(
                  'Caché limpiado',
                  'Se ha liberado el espacio correctamente.',
                )
              }
              rightElement={renderChevron()}
            />
          </View>
        </View>

        {/* Logout & Delete */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={Colors.semantic.error}
          />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Eliminar cuenta</Text>
        </TouchableOpacity>

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
    backgroundColor: Colors.light.surface,
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
  card: {
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
    overflow: 'hidden',
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