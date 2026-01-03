import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; //
import { useDrawer } from '@/hooks/useDrawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import GoOnlineButton from '@/components/driver/GoOnlineButton';
import EarningsHeader from '@/components/driver/EarningsHeader';
import RideRequestModal from '@/components/driver/RideRequestModal';
import { useAuth } from '@/hooks/useAuth';
import TripActionSheet, { TripStatus } from './TripActionSheet';
import TripSummaryModal from './TripSummaryModal';

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
  const { openDrawer } = useDrawer();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);
  const [currentTripStatus, setCurrentTripStatus] = useState<TripStatus | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const simulateAcceptRide = () => {
    setCurrentTripStatus(TripStatus.ACCEPTED);
  };

  const handleFinishRating = (rating: number) => {
    console.log(`Viaje calificado con ${rating} estrellas`);
    setShowSummary(false);
    // Aquí enviarías los datos al backend
  };

  const handleTripAction = (newStatus: TripStatus) => {
    console.log('Cambiando estado a:', newStatus);
    
    if (newStatus === TripStatus.COMPLETED) {
      setShowSummary(true);
      setCurrentTripStatus(null);
    } else {
      setCurrentTripStatus(newStatus);
    }
  };

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
        customMapStyle={Platform.OS === 'android' ? MAP_STYLE : undefined}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isOnline && (
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
            <View style={styles.carMarker}>
              <View style={styles.carPulse} />
              <Ionicons name="car" size={24} color={Colors.base.white} />
            </View>
          </Marker>
        )}
      </MapView>

      <EarningsHeader />

      <TouchableOpacity style={styles.profileBtn} onPress={openDrawer}>
        <ImagePlaceholder initials={getInitials()} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsBtn} onPress={() => router.push('/(driver)/settings')}>
        <Ionicons name="options" size={24} color={Colors.base.black} />
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
                  <MaterialCommunityIcons name="lightning-bolt" size={24} color={isOnline ? Colors.brand.secondary : Colors.grey[800]} />
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

      {currentTripStatus && (
        <TripActionSheet
          status={currentTripStatus}
          passengerName="Ana García"
          passengerRating={4.8}
          passengerPhone="555-1234-5678"
          address="Av. Reforma 222, CDMX"
          onAction={handleTripAction}
          onCancel={() => setCurrentTripStatus(null)}
        />
      )}
      
      {__DEV__ && !currentTripStatus && (
          <TouchableOpacity 
            onPress={simulateAcceptRide} 
            style={{position: 'absolute', top: 100, right: 20, backgroundColor: Colors.base.white, padding: 10}}>
            <Text>Simular Aceptar Viaje</Text>
          </TouchableOpacity>
      )}

      <TripSummaryModal
        visible={showSummary}
        price={85.50} // Dato dinámico
        paymentMethod="cash" // Dato dinámico
        passengerName="Ana García"
        onComplete={handleFinishRating}
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
  container: { flex: 1, backgroundColor: Colors.base.white },
  carMarker: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.brand.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.base.white, elevation: 5 },
  carPulse: { position: 'absolute', width: 70, height: 70, borderRadius: 35, backgroundColor: Colors.brand.primary, opacity: 0.2 },
  profileBtn: { position: 'absolute', top: 60, left: 20, zIndex: 10, ...Shadows.lg },
  settingsBtn: { position: 'absolute', top: 60, right: 20, width: 45, height: 45, borderRadius: 25, backgroundColor: Colors.base.white, alignItems: 'center', justifyContent: 'center', zIndex: 10, ...Shadows.lg },
  avatar: { width: 45, height: 45, borderRadius: 25, backgroundColor: Colors.grey[800], alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.base.white },
  avatarText: { color: Colors.base.white, fontWeight: 'bold' },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.base.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 50,
    alignItems: 'center',
    ...Shadows.xl
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
    color: Colors.grey[800],
    marginTop: 10
  },
  statusSubtext: { fontSize: 12, color: Colors.grey[600], marginBottom: 20 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 30, marginTop: 10 },
  optionItem: { alignItems: 'center' },
  optionLabel: { fontSize: 10, color: Colors.grey[600], marginTop: 4 },
});