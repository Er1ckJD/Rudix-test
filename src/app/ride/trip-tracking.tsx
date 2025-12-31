import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { usePreventRemove } from '@react-navigation/native';

type TripStatus = 'searching' | 'accepted' | 'arrived' | 'in_progress';

export default function TripTrackingScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [status, setStatus] = useState<TripStatus>('searching');

  // Bloquea el gesto de "atrás" durante un viaje activo para evitar perder la pantalla
  usePreventRemove(
    status === 'accepted' || status === 'arrived' || status === 'in_progress',
    ({ data }) => {
      Alert.alert(
        '¿Salir de la pantalla del viaje?',
        'Hay un viaje en curso. Si sales, puedes volver a encontrar el seguimiento desde el menú principal.',
        [
          { text: "Quedarse", style: 'cancel', onPress: () => {} },
          { 
            text: 'Salir',
            style: 'destructive',
            // Permite que la acción de navegación continúe si el usuario confirma
            onPress: () => navigation.dispatch(data.action),
          },
        ]
      );
    }
  );

  // SIMULACIÓN DE ESTADOS DEL VIAJE (Backend Mock)
  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('accepted'), 4000); // 4s: Conductor acepta
    const timer2 = setTimeout(() => setStatus('arrived'), 10000); // 10s: Conductor llega
    const timer3 = setTimeout(() => setStatus('in_progress'), 15000); // 15s: Inicia viaje
    const timer4 = setTimeout(() => {
        // 25s: Fin del viaje -> Ir a calificar
        router.replace('/ride/rating'); 
    }, 25000);

    return () => {
      clearTimeout(timer1); clearTimeout(timer2);
      clearTimeout(timer3); clearTimeout(timer4);
    };
  }, []);

  const handleCancel = () => {
    Alert.alert("Cancelar Viaje", "¿Seguro que deseas cancelar? Se aplicará una tarifa de cancelación.", [
        { text: "No", style: "cancel" },
        { text: "Sí, cancelar", style: "destructive", onPress: () => router.replace('/') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* MAPA DE FONDO */}
      <MapView
        style={StyleSheet.absoluteFill}
        provider="google"
        initialRegion={{
          latitude: 19.4326, longitude: -99.1332,
          latitudeDelta: 0.01, longitudeDelta: 0.01,
        }}
      >
        {status !== 'searching' && (
            <>
                {/* Auto del Conductor (Animado en una app real) */}
                <Marker coordinate={{ latitude: 19.4340, longitude: -99.1350 }}>
                    <View style={styles.carMarker}>
                        <Ionicons name="car-sport" size={20} color="#fff" />
                    </View>
                </Marker>
                
                {/* Ruta (Polyline) */}
                <Polyline 
                    coordinates={[
                        { latitude: 19.4340, longitude: -99.1350 },
                        { latitude: 19.4326, longitude: -99.1332 }
                    ]}
                    strokeColor={Colors.light.primary}
                    strokeWidth={4}
                />
            </>
        )}
        
        {/* Mi Ubicación */}
        <Marker coordinate={{ latitude: 19.4326, longitude: -99.1332 }}>
            <View style={styles.myLocationDot} />
        </Marker>
      </MapView>

      {/* HEADER FLOTANTE (Estado) */}
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.statusPill}>
            {status === 'searching' && <ActivityIndicator size="small" color="#fff" />}
            <Text style={styles.statusText}>
                {status === 'searching' && ' Buscando conductor cercano...'}
                {status === 'accepted' && ' Conductor en camino • 4 min'}
                {status === 'arrived' && ' ¡Tu conductor ha llegado!'}
                {status === 'in_progress' && ' En viaje a destino'}
            </Text>
        </View>
      </SafeAreaView>

      {/* PANEL INFERIOR */}
      <View style={styles.bottomSheet}>
        {status === 'searching' ? (
             <View style={styles.searchingContainer}>
                <Text style={styles.searchingTitle}>Conectando con conductores...</Text>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelText}>Cancelar Solicitud</Text>
                </TouchableOpacity>
             </View>
        ) : (
            <>
                {/* Información del Conductor */}
                <View style={styles.driverRow}>
                    <View>
                        <Text style={styles.plateText}>MX • 723-AZW</Text>
                        <Text style={styles.carModel}>Nissan Versa • Gris</Text>
                        <Text style={styles.driverName}>Carlos Mendoza</Text>
                        <View style={styles.ratingBox}>
                            <Ionicons name="star" size={12} color={Colors.common.gold} />
                            <Text style={styles.ratingText}>4.9</Text>
                        </View>
                    </View>
                    <Image 
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                        style={styles.driverAvatar} 
                    />
                </View>

                <View style={styles.divider} />

                {/* Acciones */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="call-outline" size={24} color={Colors.grey[1400]} />
                        <Text style={styles.actionLabel}>Llamar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.actionBtn}
                        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: 'trip_123' } })}
                    >
                        <Ionicons name="chatbubble-outline" size={24} color={Colors.grey[1400]} />
                        <Text style={styles.actionLabel}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="share-social-outline" size={24} color={Colors.grey[1400]} />
                        <Text style={styles.actionLabel}>Compartir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionBtn, { opacity: 0.5 }]} onPress={handleCancel}>
                        <Ionicons name="close-circle-outline" size={24} color={Colors.common.error} />
                        <Text style={[styles.actionLabel, { color: Colors.common.error }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  
  // Mapa
  carMarker: { backgroundColor: Colors.light.primary, padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  myLocationDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.common.appleBlue, borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.2, elevation: 5 },

  // Header Estado
  topContainer: { alignItems: 'center', marginTop: 10 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[1400], paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 5, shadowColor: '#000', shadowOpacity: 0.3 },
  statusText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },

  // Panel Inferior
  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, elevation: 20, shadowColor: '#000', shadowOffset: {width:0, height:-5}, shadowOpacity: 0.1, shadowRadius: 10 },
  
  // Estado Buscando
  searchingContainer: { alignItems: 'center', paddingVertical: 20 },
  searchingTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.grey[1400], marginBottom: 20 },
  cancelButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: Colors.grey[200] },
  cancelText: { color: Colors.grey[1400], fontWeight: '600' },

  // Estado Aceptado (Driver Info)
  driverRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  plateText: { fontSize: 18, fontWeight: '900', color: Colors.grey[1400], letterSpacing: 1 },
  carModel: { fontSize: 14, color: Colors.grey[900], marginVertical: 2 },
  driverName: { fontSize: 14, fontWeight: '600', color: Colors.grey[1200] },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[100], alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, marginTop: 4 },
  ratingText: { fontSize: 10, fontWeight: 'bold', marginLeft: 3 },
  driverAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: Colors.grey[200] },
  
  divider: { height: 1, backgroundColor: Colors.grey[200], marginBottom: 20 },

  // Botones de acción
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { alignItems: 'center', width: 60 },
  actionLabel: { fontSize: 10, color: Colors.grey[900], marginTop: 5 }
});