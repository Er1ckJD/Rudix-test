import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { Colors } from '@/constants/theme';
import GoOnlineButton from '@/components/driver/GoOnlineButton';
import EarningsHeader from '@/components/driver/EarningsHeader';
import RideRequestModal from '@/components/driver/RideRequestModal';
import { useAuth } from '@/hooks/useAuth';
import { DrawerActions } from '@react-navigation/native';

// Los estilos JSON son específicos de Google Maps.
// Al usar el mapa nativo (Apple Maps en iOS), estos estilos se ignorarán automáticamente.
const MAP_STYLE = [
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#747474" }, { lightness: "23" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] }
];

export default function DriverHomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);

  const getInitials = () => {
    if (!user) return '';
    const first = user.nombres?.[0] || '';
    const last = user.apellidos?.[0] || '';
    return `${first}${last}`.toUpperCase();
  };

  const toggleOnline = () => {
    const newState = !isOnline;
    setIsOnline(newState);

    if (newState) {
      setTimeout(() => {
        setRequestVisible(true);
      }, 3000);
    } else {
      setRequestVisible(false);
    }
  };

  const handleAcceptTrip = () => {
    setRequestVisible(false);
    alert('¡Viaje Aceptado!');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        customMapStyle={MAP_STYLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // provider="google" <--- ELIMINADO para usar el mapa nativo sin API Key
      >
        {isOnline && (
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
            <View style={styles.carMarker}>
              <View style={styles.carPulse} />
              <Ionicons name="car" size={24} color={Colors.common.white} />
            </View>
          </Marker>
        )}
      </MapView>

      <EarningsHeader />

      <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <ImagePlaceholder initials={getInitials()} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsBtn} onPress={() => router.push('/driver/settings')}>
        <Ionicons name="options" size={24} color={Colors.common.black} />
      </TouchableOpacity>

      <View style={styles.bottomPanel}>
          <View style={styles.goButtonContainer}>
              <GoOnlineButton isOnline={isOnline} onPress={toggleOnline} />
          </View>

          <Text style={styles.statusText}>
              {isOnline ? 'Estás en línea' : 'Estás desconectado'}
          </Text>
          <Text style={styles.statusSubtext}>
              {isOnline ? 'Recibiendo solicitudes...' : 'Conéctate para recibir viajes'}
          </Text>

          <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.optionItem}>
                  <MaterialCommunityIcons name="lightning-bolt" size={24} color={isOnline ? Colors.common.gold : Colors.grey[800]} />
                  <Text style={styles.optionLabel}>Rayo</Text>
              </TouchableOpacity>
              <View style={{width: 80}} />
              <TouchableOpacity style={styles.optionItem}>
                  <Ionicons name="list" size={24} color={Colors.grey[1100]} />
                  <Text style={styles.optionLabel}>Agenda</Text>
              </TouchableOpacity>
          </View>
      </View>

      <RideRequestModal
        visible={requestVisible}
        onAccept={handleAcceptTrip}
        onDecline={() => setRequestVisible(false)}
      />

    </View>
  );
}

const ImagePlaceholder = ({ initials }: { initials: string }) => (
    <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.common.white },
  carMarker: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.common.white, elevation: 5 },
  carPulse: { position: 'absolute', width: 70, height: 70, borderRadius: 35, backgroundColor: Colors.light.primary, opacity: 0.2 },
  profileBtn: { position: 'absolute', top: 60, left: 20, elevation: 5, zIndex: 10 },
  settingsBtn: { position: 'absolute', top: 60, right: 20, width: 45, height: 45, borderRadius: 25, backgroundColor: Colors.common.white, alignItems: 'center', justifyContent: 'center', elevation: 5, zIndex: 10 },
  avatar: { width: 45, height: 45, borderRadius: 25, backgroundColor: Colors.grey[1400], alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.common.white },
  avatarText: { color: Colors.common.white, fontWeight: 'bold' },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.common.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 50,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
  },
  goButtonContainer: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    zIndex: 50,
    elevation: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.grey[1400],
    marginTop: 10
  },
  statusSubtext: { fontSize: 12, color: Colors.grey[1000], marginBottom: 20 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 30, marginTop: 10 },
  optionItem: { alignItems: 'center' },
  optionLabel: { fontSize: 10, color: Colors.grey[1100], marginTop: 4 },
});