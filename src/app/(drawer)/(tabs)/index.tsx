import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/hooks/useAuth';
import DriverHomeScreen from '@/components/driver/DriverHomeScreen';

function PassengerHomeScreen({ drawerNavigation }: { drawerNavigation: any }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const INITIAL_REGION = {
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <View style={styles.container}>
      
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapPadding={{ top: insets.top, right: 0, bottom: 280, left: 0 }}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        customMapStyle={[
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] }
        ]}
      >
         <Marker coordinate={{ latitude: 19.4340, longitude: -99.1350 }}>
            <View style={styles.carMarker}>
                <Ionicons name="car-sport" size={18} color={Colors.common.white} />
            </View>
         </Marker>
      </MapView>

      <View style={[styles.headerLayer, { top: insets.top + 10 }]}>
          <TouchableOpacity 
            style={styles.roundButton} 
            onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())}
          >
            <Ionicons name="menu" size={24} color={Colors.grey[1400]} />
          </TouchableOpacity>

          <View style={styles.locationPill}>
             <View style={styles.greenDot} />
             <Text style={styles.locationText}>Kristel St, CDMX</Text>
             <Ionicons name="chevron-down" size={16} color={Colors.grey[1100]} />
          </View>

          <TouchableOpacity 
            style={[styles.roundButton, {backgroundColor: Colors.grey[200]}]}
            onPress={() => router.push('/profile')}
          >
             <Text style={{fontWeight:'bold', color: Colors.light.primary}}>EA</Text>
          </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.gpsButton, { bottom: 300 + insets.bottom }]}>
          <Ionicons name="locate" size={24} color={Colors.light.primary} />
      </TouchableOpacity>

      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
          
          <View style={styles.dragHandle} />

          <Text style={styles.greetingTitle}>¿A dónde vamos?</Text>

          <TouchableOpacity style={styles.searchBox} activeOpacity={0.9}>
              <Ionicons name="search" size={22} color={Colors.light.primary} style={{marginRight: 10}} />
              <Text style={styles.searchPlaceholder}>Buscar destino...</Text>
              <View style={styles.timeBadge}>
                  <Ionicons name="time" size={12} color="#fff" />
                  <Text style={styles.timeText}>Ahora</Text>
              </View>
          </TouchableOpacity>

          <ScrollView 
            style={styles.favoritesList} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: 10}}
          >
              <FavoriteItem 
                icon="briefcase" 
                color={Colors.common.appleBlue}
                title="Ir a la Oficina" 
                subtitle="Ficachi Exploradores, Reforma" 
              />
              <FavoriteItem 
                icon="home" 
                color={Colors.light.primary}
                title="Casa" 
                subtitle="Habaneras 61, Virginia" 
              />
              <FavoriteItem 
                icon="location" 
                color={Colors.grey[1000]}
                title="Universidad" 
                subtitle="Cristóbal Colón, Campus Torrente" 
              />
          </ScrollView>
      </View>

    </View>
  );
}


export default function HomeScreen() {
  const { activeRole } = useAuth();
  const navigation = useNavigation();
  const drawerNavigation = navigation.getParent('MyDrawer');

  if (!drawerNavigation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading Drawer Navigation...</Text>
      </View>
    );
  }

  if (activeRole === 'driver') {
    return <DriverHomeScreen drawerNavigation={drawerNavigation} />;
  }

  return <PassengerHomeScreen drawerNavigation={drawerNavigation} />;
}


// Componente auxiliar mejorado
const FavoriteItem = ({ icon, color, title, subtitle }: any) => (
    <TouchableOpacity style={styles.favItem}>
        <View style={[styles.favIconCircle, { backgroundColor: color + '20' }]}> 
            {/* El +'20' añade transparencia hexadecimal al color base */}
            <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={styles.favTextContainer}>
            <Text style={styles.favTitle}>{title}</Text>
            <Text style={styles.favSubtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }, // Fondo blanco base
  map: { ...StyleSheet.absoluteFillObject },
  
  // Header
  headerLayer: {
      position: 'absolute',
      left: 0, right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      zIndex: 10,
  },
  roundButton: {
      width: 45, height: 45,
      backgroundColor: '#fff',
      borderRadius: 25,
      alignItems: 'center', justifyContent: 'center',
      elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: {width:0, height:4}
  },
  locationPill: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 10, paddingHorizontal: 15,
      borderRadius: 25,
      gap: 8,
      elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
  },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.light.primary },
  locationText: { fontWeight: 'bold', fontSize: 14, color: Colors.grey[1400] },

  // Marcador de coche en mapa
  carMarker: {
      backgroundColor: Colors.light.primary,
      padding: 8, borderRadius: 20,
      borderWidth: 2, borderColor: '#fff'
  },

  // Botón GPS
  gpsButton: {
      position: 'absolute', right: 20,
      width: 50, height: 50,
      backgroundColor: '#fff',
      borderRadius: 25,
      alignItems: 'center', justifyContent: 'center',
      elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5,
      zIndex: 5
  },

  // --- AQUÍ ESTÁ LA MAGIA DEL FOOTER ---
  bottomSheet: {
      position: 'absolute', // Clave: Flota sobre el mapa
      bottom: 0, left: 0, right: 0, // Anclado abajo y a los lados
      backgroundColor: '#fff',
      borderTopLeftRadius: 30, // Curvas suaves
      borderTopRightRadius: 30,
      paddingTop: 15,
      paddingHorizontal: 25,
      // Sombra hacia arriba (Negativo Y)
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 20,
  },
  dragHandle: {
      width: 40, height: 5,
      backgroundColor: Colors.grey[300],
      borderRadius: 3,
      alignSelf: 'center',
      marginBottom: 20
  },
  greetingTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.grey[1400], marginBottom: 15 },
  
  // Caja de búsqueda
  searchBox: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: Colors.grey[100],
      padding: 15, borderRadius: 15,
      borderWidth: 1, borderColor: Colors.grey[200],
      marginBottom: 20
  },
  searchPlaceholder: { flex: 1, fontSize: 16, color: Colors.grey[1100], fontWeight: '500' },
  timeBadge: {
      flexDirection: 'row', alignItems: 'center', gap: 4,
      backgroundColor: Colors.grey[1400], // Oscuro para contraste
      paddingHorizontal: 10, paddingVertical: 5,
      borderRadius: 20
  },
  timeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  // Favoritos
  favoritesList: { maxHeight: 200 }, // Limita altura para pantallas pequeñas
  favItem: {
      flexDirection: 'row', alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1, borderBottomColor: Colors.grey[100]
  },
  favIconCircle: {
      width: 40, height: 40,
      borderRadius: 20,
      alignItems: 'center', justifyContent: 'center',
      marginRight: 15
  },
  favTextContainer: { flex: 1 },
  favTitle: { fontWeight: 'bold', fontSize: 15, color: Colors.grey[1400] },
  favSubtitle: { fontSize: 12, color: Colors.grey[900], marginTop: 2 },
});
