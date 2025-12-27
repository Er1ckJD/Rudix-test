import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { Trip } from '@/types/trip';

export default function TripDetailsScreen() {
  const router = useRouter();
  const { tripData } = useLocalSearchParams();
  
  // Parseamos los datos o usamos unos default si falla
  const trip: Trip = tripData ? JSON.parse(tripData as string) : null;

  if (!trip) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Ocultamos header default para hacerlo custom o estilo modal */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.modalContent}>
        <Text style={styles.title}>Detalles del viaje</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
            
            {/* 1. Mapa (Imagen Placeholder) */}
            <View style={styles.mapContainer}>
                {/* Aquí iría tu componente MapView o Imagen del mapa */}
                <View style={styles.mapPlaceholder}>
                     <Ionicons name="map-outline" size={40} color={Colors.light.primary} />
                     <View style={styles.dummyRouteLine} />
                     <View style={[styles.mapPin, {top: 80, left: 50, backgroundColor:'#007AFF'}]}>
                        <Text style={styles.pinText}>A</Text>
                     </View>
                     <View style={[styles.mapPin, {top: 40, left: 200, backgroundColor: Colors.light.primary}]}>
                        <Text style={styles.pinText}>B</Text>
                     </View>
                </View>
            </View>

            {/* 2. Tarjeta de Información de Ruta y Tiempos */}
            <View style={styles.infoCard}>
                <View style={styles.dateHeader}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.dateText}>{trip.date}</Text>
                </View>

                <View style={styles.routeSection}>
                    {/* Línea de tiempo visual */}
                    <View style={styles.timelineVisual}>
                        <View style={[styles.dot, {backgroundColor:'#ddd'}]} />
                        <View style={styles.line} />
                        <View style={[styles.dot, {backgroundColor: Colors.light.primary}]} />
                    </View>
                    
                    {/* Textos de Origen/Destino y Horas */}
                    <View style={styles.addressesContainer}>
                        <View style={styles.addressRow}>
                            <Text style={styles.addressLabel}>{trip.pickupAddress}</Text>
                            <Text style={styles.timeLabel}>2:00 pm</Text>
                        </View>
                        <View style={[styles.addressRow, {marginTop: 25}]}>
                            <Text style={styles.addressLabel}>{trip.dropoffAddress}</Text>
                            <Text style={styles.timeLabel}>2:25 pm</Text>
                        </View>
                    </View>
                </View>

                {/* Separador */}
                <View style={styles.divider} />

                {/* Métricas Inferiores */}
                <View style={styles.metricsRow}>
                    <View style={styles.metric}>
                        <Ionicons name="time-outline" size={18} color="#666" />
                        <Text style={styles.metricValue}>{trip.duration}</Text>
                    </View>
                     <View style={styles.metric}>
                        <Ionicons name="location-outline" size={18} color="#666" />
                        <Text style={styles.metricValue}>{trip.distance}</Text>
                    </View>
                     <View style={styles.metric}>
                        <Text style={styles.currency}>$</Text>
                        <Text style={styles.metricValue}>{trip.price}</Text>
                    </View>
                </View>
            </View>

            {/* 3. Tarjeta del Conductor */}
            <View style={styles.driverCard}>
                 <View style={styles.driverAvatar}>
                    {trip.driver?.photoUrl ? (
                        <Image source={{ uri: trip.driver.photoUrl }} style={{width: '100%', height: '100%'}} />
                    ) : (
                      <Text style={{color:'#fff', fontWeight:'bold', fontSize: 18}}>
                        {trip.driver?.name.charAt(0)}
                      </Text>
                    )}
                 </View>
                 <View style={{flex: 1, marginLeft: 15}}>
                     <Text style={styles.driverName}>{trip.driver?.name}</Text>
                     <Text style={styles.carInfo}>{trip.driver?.vehicleModel}</Text>
                     <Text style={styles.plateInfo}>{trip.driver?.vehiclePlate}</Text>
                 </View>
                 <View style={styles.ratingBox}>
                     <Ionicons name="star" size={14} color="#FFD700" />
                     <Text style={styles.ratingNum}>{trip.driver?.rating}</Text>
                 </View>
            </View>

            {/* 4. Botones de Acción (Iconos Cuadrados) */}
            <View style={styles.actionsRow}>
                <ActionButton icon="receipt-outline" label="Recibo" />
                <ActionButton icon="chatbubble-outline" label="Soporte" />
                <ActionButton icon="refresh" label="Rutas/Algo" />
            </View>

            {/* 5. Botones Principales */}
            <TouchableOpacity style={styles.repeatButton}>
                <Text style={styles.repeatButtonText}>Repetir este Viaje</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Componente auxiliar para botones cuadrados
const ActionButton = ({ icon, label }: { icon: any, label: string }) => (
    <TouchableOpacity style={styles.actionBtn}>
        <View style={styles.actionIconBox}>
             <Ionicons name={icon} size={24} color="#666" />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }, // Fondo semitransparente si fuera modal real, o gris si es pantalla
  modalContent: { 
      flex: 1, 
      backgroundColor: '#f2f2f2', 
      marginTop: 20, // Simulando que no llega al tope
      borderTopLeftRadius: 25, 
      borderTopRightRadius: 25,
      paddingHorizontal: 20,
      paddingTop: 20
  },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  
  // Mapa
  mapContainer: { height: 150, borderRadius: 15, overflow: 'hidden', marginBottom: 15, backgroundColor: '#fff' },
  mapPlaceholder: { flex: 1, backgroundColor: '#e1e1e1', alignItems: 'center', justifyContent: 'center' },
  dummyRouteLine: { position:'absolute', width: 100, height: 2, backgroundColor: Colors.light.primary, transform:[{rotate:'-45deg'}] },
  mapPin: { position:'absolute', width:24, height:24, borderRadius:12, alignItems:'center', justifyContent:'center' },
  pinText: { color:'#fff', fontSize:10, fontWeight:'bold' },

  // Tarjeta Info
  infoCard: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, elevation: 2 },
  dateHeader: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginBottom: 15 },
  dateText: { color: '#666', fontSize: 13 },
  
  routeSection: { flexDirection: 'row', marginBottom: 15 },
  timelineVisual: { alignItems: 'center', width: 20, marginRight: 10, paddingTop: 5 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  line: { width: 2, height: 35, backgroundColor: '#ddd', marginVertical: 4 }, // Línea punteada simulada
  addressesContainer: { flex: 1 },
  addressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addressLabel: { fontSize: 14, color: '#333', fontWeight: '500' },
  timeLabel: { fontSize: 13, color: '#666' },

  divider: { height: 1, backgroundColor: '#f5f5f5', marginBottom: 15 },

  metricsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  metric: { alignItems: 'center', gap: 4 },
  metricValue: { fontWeight: 'bold', color: '#333', fontSize: 14 },
  currency: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  // Tarjeta Conductor
  driverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 20, elevation: 2 },
  driverAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center' },
  driverName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  carInfo: { color: '#666', fontSize: 13 },
  plateInfo: { color: '#888', fontSize: 12 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingNum: { fontWeight: 'bold', color: '#333' },

  // Acciones
  actionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 25 },
  actionBtn: { alignItems: 'center' },
  actionIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#eee', marginBottom: 5 },
  actionLabel: { fontSize: 11, color: '#666' },

  // Botones Finales
  repeatButton: { backgroundColor: Colors.light.primary, paddingVertical: 15, borderRadius: 30, alignItems: 'center', marginBottom: 15, shadowColor: Colors.light.primary, shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: {width:0, height:4} },
  repeatButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeButton: { backgroundColor: '#e0e0e0', paddingVertical: 15, borderRadius: 30, alignItems: 'center' },
  closeButtonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
});