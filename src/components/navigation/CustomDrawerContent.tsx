import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const { activeRole, switchActiveRole } = useAuth(); // Get activeRole from useAuth

  const isDriver = activeRole === 'driver';

  const navigateTo = (path: Href) => {
    router.push(path);
    props.navigation.closeDrawer();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* HEADER DEL PERFIL (Común para todos) */}
        <TouchableOpacity
            style={[styles.headerContainer, { paddingTop: top + 20 }]}
            onPress={() => navigateTo('/profile')}
            activeOpacity={0.7}
        >
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>E</Text>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.profileLabel}>Mi Perfil</Text>
                <Text style={styles.profileName}>Edgar Alessandro</Text>
                {/* Ocultamos rating si es solo pasajero, o mostramos rating de pasajero */}
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={Colors.common.gold} />
                    <Text style={styles.ratingText}>5.0</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.grey[800]} style={{marginLeft: 'auto'}}/>
          </View>
        </TouchableOpacity>

        {/* LISTA DE OPCIONES */}
        <View style={styles.itemsContainer}>

            {/* --- OPCIONES GENERALES (PARA TODOS) --- */}
            <DrawerCard
                label="Inicio"
                icon="map-outline"
                onPress={() => {
                    const targetScreen = isDriver ? 'home' : '(tabs)';
                    props.navigation.jumpTo(targetScreen);
                    props.navigation.closeDrawer();
                }}
            />
            <DrawerCard
                label="Mis Viajes"
                icon="time-outline"
                onPress={() => navigateTo('/history')}
            />
            <DrawerCard
                label="Métodos de Pago" // Billetera de usuario (para pagar), no cobrar
                icon="card-outline"
                onPress={() => navigateTo('/driver/wallet/payment-methods')} // Reutilizamos o creamos pantalla de pagos usuario
            />
            <DrawerCard
                label="Notificaciones"
                icon="notifications-outline"
                onPress={() => navigateTo('/notifications')}
            />

            {/* --- SECCIÓN EXCLUSIVA CONDUCTOR (Solo se ve si isDriver === true) --- */}
            {isDriver && (
                <>
                    <View style={styles.divider} />
                    <Text style={styles.sectionTitle}>PANEL CONDUCTOR</Text>

                    <DrawerCard
                        label="Billetera / Ganancias"
                        icon="wallet-outline"
                        onPress={() => navigateTo('/driver/wallet')}
                    />
                    <DrawerCard
                        label="RuDix Fidelity"
                        icon="ribbon-outline"
                        onPress={() => navigateTo('/driver/fidelity')}
                    />
                    <DrawerCard
                        label="Configuración Vehículo"
                        icon="car-sport-outline"
                        onPress={() => navigateTo('/driver/settings')}
                    />
                    <DrawerCard
                        label="Ayuda Conductor"
                        icon="headset-outline"
                        onPress={() => navigateTo('/driver/support')}
                    />
                </>
            )}

            {/* --- MÁS OPCIONES GENERALES --- */}
            <View style={styles.divider} />
            <DrawerCard
                label="Seguridad"
                icon="shield-checkmark-outline"
                onPress={() => navigateTo('/security')}
            />
            <DrawerCard
                label="Centro de Ayuda"
                icon="headset-outline"
                onPress={() => navigateTo('/help')}
            />
            <DrawerCard
                label="Términos y Condiciones"
                icon="document-text-outline"
                onPress={() => navigateTo('/terms')}
            />
            <DrawerCard
                label="Políticas de Privacidad"
                icon="lock-closed-outline"
                onPress={() => navigateTo('/privacy')}
            />
             <DrawerCard
                label="Configuración"
                icon="settings-outline"
                onPress={() => navigateTo('/settings')} // Configuración general de la app (notificaciones, idioma)
            />
        </View>
      </DrawerContentScrollView>

      {/* FOOTER: EL CAMINO PARA VOLVERSE CONDUCTOR */}
      <View style={[styles.footer, { paddingBottom: bottom + 20 }]}>
        {!isDriver ? (
            // CASO A: Usuario normal -> Ve botón para REGISTRARSE como conductor
            <TouchableOpacity style={styles.driverCtaButton} onPress={() => navigateTo('/driver/register')}>
                <View style={styles.driverCtaIcon}>
                    <Ionicons name="car" size={24} color="#fff" />
                </View>
                <View>
                    <Text style={styles.driverCtaTitle}>Genera ganancias siendo tu propio jefe</Text>
                    <Text style={styles.driverCtaSubtitle}>Registrarme como conductor</Text>
                </View>
            </TouchableOpacity>
        ) : (
            // CASO B: Ya es conductor -> Ve botón para CAMBIAR MODO (Switch)
            <TouchableOpacity style={styles.switchModeButton} onPress={() => switchActiveRole('user')}>
                <Ionicons name="swap-horizontal" size={24} color={Colors.light.primary} />
                <Text style={styles.switchModeText}>Cambiar a Modo Pasajero</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Componente auxiliar DrawerCard simplificado
const DrawerCard = ({ label, icon, onPress }: any) => (
    <TouchableOpacity style={styles.cardItem} onPress={onPress}>
        <Ionicons name={icon} size={22} color={Colors.grey[1200]} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  // ... (mismos estilos de headerContainer, profileRow, etc.)
  headerContainer: { paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: Colors.grey[200] },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.grey[200], alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: Colors.light.primary },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  profileLabel: { fontSize: 12, color: '#888' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: '#666', marginLeft: 4 },

  itemsContainer: { paddingHorizontal: 0, paddingTop: 10 },
  sectionTitle: { fontSize: 11, color: '#999', fontWeight: 'bold', marginLeft: 20, marginBottom: 5, marginTop: 10 },
  divider: { height: 1, backgroundColor: Colors.grey[200], marginVertical: 10, marginHorizontal: 20 },

  cardItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
  icon: { marginRight: 15, width: 24, textAlign: 'center' }, // Ancho fijo para alinear
  label: { fontSize: 15, color: '#333', fontWeight: '500' },

  footer: { paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: Colors.grey[200], paddingTop: 20 },

  // Estilo nuevo para el botón "Quiero ser conductor" (Más llamativo tipo Banner)
  driverCtaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Fondo oscuro para destacar
    padding: 15,
    borderRadius: 15,
  },
  driverCtaIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  driverCtaTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  driverCtaSubtitle: { color: '#ccc', fontSize: 12 },

  // Estilo para el botón de Switch (más simple)
  switchModeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 12,
      backgroundColor: Colors.grey[100],
      gap: 10
  },
  switchModeText: { color: Colors.light.primary, fontWeight: 'bold' }
});
