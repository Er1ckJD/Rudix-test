import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { useDrawer } from '@/hooks/useDrawer';
import { Colors, Spacing, Typography, Shadows, BorderRadius, hexWithOpacity } from '@/constants/theme';
import { useLocation } from '@/hooks/useLocation';
import Toast from 'react-native-toast-message';

export default function PassengerHomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const insets = useSafeAreaInsets();
  const { location, errorMsg, hasPermission } = useLocation();
  const mapRef = useRef<MapView>(null);
  
  const handleSearchPress = () => {
    router.push('/(passenger)/ride/search');
  };

  const handleProfilePress = () => {
    router.push('/(passenger)/profile');
  };

  const goToMyLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };
  
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>Permission to access location was denied.</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }
  
  if (!location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.brand.primary} />
        <Text style={{marginTop: Spacing.md}}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <MapView
        ref={mapRef}
        style={styles.map}
        mapPadding={{ top: insets.top, right: 0, bottom: 280, left: 0 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
         <Marker coordinate={{ latitude: 19.4340, longitude: -99.1350 }}>
            <View style={styles.carMarker}>
                <Ionicons name="car-sport" size={18} color={Colors.base.white} />
            </View>
         </Marker>
      </MapView>

      <View style={[styles.headerLayer, { top: insets.top + Spacing.sm }]}>
          <TouchableOpacity style={styles.roundButton} onPress={openDrawer}>
            <Ionicons name="menu" size={24} color={Colors.grey[800]} />
          </TouchableOpacity>

          <View style={styles.locationPill}>
             <View style={styles.greenDot} />
             {/* TODO: Implement reverse geocoding to show current address */}
             <Text style={styles.locationText}>Kristel St, CDMX</Text>
             <Ionicons name="chevron-down" size={16} color={Colors.grey[700]} />
          </View>

          <TouchableOpacity 
            style={[styles.roundButton, {backgroundColor: Colors.grey[200]}]}
            onPress={handleProfilePress}
          >
             <Text style={{fontWeight: Typography.weight.bold, color: Colors.brand.primary}}>EA</Text>
          </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.gpsButton, { bottom: 300 + insets.bottom }]}
        onPress={goToMyLocation}
      >
          <Ionicons name="locate" size={24} color={Colors.brand.primary} />
      </TouchableOpacity>

      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + Spacing.md }]}>
          
          <View style={styles.dragHandle} />

          <Text style={styles.greetingTitle}>¿A dónde vamos?</Text>

          <TouchableOpacity 
              style={styles.searchBox} 
              activeOpacity={0.9}
              onPress={handleSearchPress}
          >
              <Ionicons name="search" size={22} color={Colors.brand.primary} style={{marginRight: Spacing.sm}} />
              <Text style={styles.searchPlaceholder}>Buscar destino...</Text>
              <View style={styles.timeBadge}>
                  <Ionicons name="time" size={12} color={Colors.base.white} />
                  <Text style={styles.timeText}>Ahora</Text>
              </View>
          </TouchableOpacity>

          <ScrollView 
            style={styles.favoritesList} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop: Spacing.sm}}
          >
              <FavoriteItem 
                icon="briefcase" 
                color={Colors.social.apple}
                title="Ir a la Oficina" 
                subtitle="Ficachi Exploradores, Reforma" 
              />
              <FavoriteItem 
                icon="home" 
                color={Colors.brand.primary}
                title="Casa" 
                subtitle="Habaneras 61, Virginia" 
              />
              <FavoriteItem 
                icon="location" 
                color={Colors.grey[600]}
                title="Universidad" 
                subtitle="Cristóbal Colón, Campus Torrente" 
              />
          </ScrollView>
      </View>

    </View>
  );
}

const FavoriteItem = ({ icon, color, title, subtitle }: any) => (
    <TouchableOpacity 
        style={styles.favItem}
        onPress={() => Toast.show({ type: 'info', text1: 'Función no implementada' })}
    >
        <View style={[styles.favIconCircle, { backgroundColor: hexWithOpacity(color, 0.1) }]}> 
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1, backgroundColor: Colors.base.white },
  map: { ...StyleSheet.absoluteFillObject },
  
  headerLayer: {
      position: 'absolute',
      left: 0, right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      alignItems: 'center',
      zIndex: 10,
  },
  roundButton: {
      width: 45, height: 45,
      backgroundColor: Colors.base.white,
      borderRadius: 25,
      alignItems: 'center', justifyContent: 'center',
      ...Shadows.md
  },
  locationPill: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: Colors.base.white,
      paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md,
      borderRadius: 25,
      gap: Spacing.sm,
      ...Shadows.sm
  },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.brand.primary },
  locationText: { fontWeight: Typography.weight.bold, fontSize: Typography.size.base, color: Colors.light.text },

  carMarker: {
      backgroundColor: Colors.brand.primary,
      padding: Spacing.sm, borderRadius: 20,
      borderWidth: 2, borderColor: Colors.base.white
  },

  gpsButton: {
      position: 'absolute', right: 20,
      width: 50, height: 50,
      backgroundColor: Colors.base.white,
      borderRadius: 25,
      alignItems: 'center', justifyContent: 'center',
      ...Shadows.lg,
      zIndex: 5
  },

  bottomSheet: {
      position: 'absolute', 
      bottom: 0, left: 0, right: 0,
      backgroundColor: Colors.base.white,
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30,
      paddingTop: Spacing.md,
      paddingHorizontal: Spacing.lg,
      ...Shadows.xl,
  },
  dragHandle: {
      width: 40, height: 5,
      backgroundColor: Colors.grey[300],
      borderRadius: 3,
      alignSelf: 'center',
      marginBottom: Spacing.lg
  },
  greetingTitle: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.light.text, marginBottom: Spacing.md },
  
  searchBox: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: Colors.grey[100],
      padding: Spacing.md, borderRadius: BorderRadius.md,
      borderWidth: 1, borderColor: Colors.grey[200],
      marginBottom: Spacing.lg
  },
  searchPlaceholder: { flex: 1, fontSize: Typography.size.md, color: Colors.grey[600], fontWeight: Typography.weight.medium },
  timeBadge: {
      flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
      backgroundColor: Colors.grey[800], 
      paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs,
      borderRadius: 20
  },
  timeText: { color: Colors.base.white, fontSize: Typography.size.sm, fontWeight: Typography.weight.bold },

  favoritesList: { maxHeight: 200 }, 
  favItem: {
      flexDirection: 'row', alignItems: 'center',
      paddingVertical: Spacing.sm,
      borderBottomWidth: 1, borderBottomColor: Colors.grey[100]
  },
  favIconCircle: {
      width: 40, height: 40,
      borderRadius: 20,
      alignItems: 'center', justifyContent: 'center',
      marginRight: Spacing.md
  },
  favTextContainer: { flex: 1 },
  favTitle: { fontWeight: Typography.weight.bold, fontSize: Typography.size.md, color: Colors.light.text },
  favSubtitle: { fontSize: Typography.size.sm, color: Colors.grey[600], marginTop: 2 },
});
