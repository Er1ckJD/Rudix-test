import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { Trip } from '@/types/trip';
import { useColorScheme } from '@/hooks/use-color-scheme';

const SAMPLE_TRIPS: Trip[] = [
  {
    id: 'trip_1',
    date: '15 Dic 2025 - 14:30',
    pickupAddress: 'Centro Histórico',
    dropoffAddress: 'Plaza las Américas',
    price: '$ 89.00',
    status: 'completed',
    distance: '8.2 km',
    duration: '22 min',
    driver: {
        id: 'd1',
        name: 'Carlos Mendoza',
        rating: 4.82,
        photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        vehicleModel: 'Nissan Versa',
        vehiclePlate: 'A23348*D'
    }
  },
  {
    id: 'trip_2',
    date: '14 Dic 2025 - 09:15',
    pickupAddress: 'Av. Reforma',
    dropoffAddress: 'Aeropuerto INT',
    price: '$ 150.00',
    status: 'completed',
    distance: '12.5 km',
    duration: '45 min',
    driver: {
        id: 'd2',
        name: 'Ana López',
        rating: 4.95,
        photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
        vehicleModel: 'Kia Rio',
        vehiclePlate: 'B9912*Z'
    }
  },
];

const FilterTabs = () => (
    <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterBtn, styles.filterBtnActive]}>
            <Text style={styles.filterTextActive}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Completados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>Cancelados</Text>
        </TouchableOpacity>
    </View>
);

export default function HistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handlePressTrip = (tripId: string) => {
    const tripData = JSON.stringify(SAMPLE_TRIPS.find(t => t.id === tripId));
    router.push({ pathname: '/history/details', params: { tripData } });
  };

  const renderTripItem = ({ item }: { item: Trip }) => (
      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => handlePressTrip(item.id)}>
          <View style={styles.cardHeader}>
              <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={14} color="#666" style={{marginRight: 5}}/>
                  <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={[styles.statusBadge, item.status === 'completed' ? styles.statusSuccess : styles.statusCancel]}>
                  <Text style={[styles.statusText, {color: item.status === 'completed' ? Colors.light.primary : '#d32f2f'}]}>
                      {item.status === 'completed' ? 'Completado' : 'Cancelado'}
                  </Text>
              </View>
          </View>

          <View style={styles.cardBody}>
              <View style={styles.timelineContainer}>
                  <View style={styles.timelineItem}>
                      <View style={styles.dotGray} />
                      <Text style={styles.addressText}>{item.pickupAddress}</Text>
                  </View>
                  <View style={styles.connectorLine} />
                  <View style={styles.timelineItem}>
                      <View style={styles.dotGreen} />
                      <Text style={styles.addressText}>{item.dropoffAddress}</Text>
                  </View>
              </View>

              <View style={styles.metricsContainer}>
                  <View style={styles.metricItem}>
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text style={styles.metricText}>{item.duration}</Text>
                  </View>
                  <View style={styles.metricItem}>
                      <Ionicons name="location-outline" size={16} color="#666" />
                      <Text style={styles.metricText}>{item.distance}</Text>
                  </View>
                  <View style={styles.metricItem}>
                      <Text style={styles.priceLabel}>$</Text>
                      <Text style={styles.metricText}>{item.price}</Text>
                  </View>
              </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardFooter}>
              <View style={styles.driverInfo}>
                  <View style={styles.driverAvatar}>
                      <Text style={{color:'#fff', fontWeight:'bold'}}>CM</Text> 
                  </View>
                  <View>
                      <Text style={styles.driverName}>{item.driver?.name}</Text>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Ionicons name="star" size={12} color="#FFD700" />
                          <Text style={styles.ratingText}>{item.driver?.rating}</Text>
                      </View>
                  </View>
              </View>
              <View style={styles.detailsLink}>
                  <Text style={styles.detailsText}>Ver detalles</Text>
                  <Ionicons name="chevron-forward" size={16} color="#666" />
              </View>
          </View>
      </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f5f5f5' }]}>
      <Stack.Screen 
        options={{ 
          title: 'Historial de Viajes', 
          headerShadowVisible: false, 
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f5f5f5' },
          headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
        <FilterTabs />
      </View>

      <FlatList
        data={SAMPLE_TRIPS}
        keyExtractor={(item) => item.id}
        renderItem={renderTripItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    filterContainer: { flexDirection: 'row', gap: 10, marginVertical: 10 },
    filterBtn: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
    filterBtnActive: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
    filterText: { color: '#666', fontSize: 13 },
    filterTextActive: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
    card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 15, padding: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    dateRow: { flexDirection: 'row', alignItems: 'center' },
    dateText: { color: '#666', fontSize: 13 },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
    statusSuccess: { backgroundColor: '#E8F5E9' },
    statusCancel: { backgroundColor: '#FFEBEE' },
    statusText: { fontSize: 11, fontWeight: 'bold' },
    cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    timelineContainer: { flex: 1 },
    timelineItem: { flexDirection: 'row', alignItems: 'center', height: 20 },
    dotGray: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ddd', marginRight: 10 },
    dotGreen: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.light.primary, marginRight: 10 },
    connectorLine: { width: 1, height: 20, backgroundColor: '#ddd', marginLeft: 4.5, marginVertical: 2 },
    addressText: { fontSize: 13, color: '#333' },
    metricsContainer: { alignItems: 'flex-end', gap: 5 },
    metricItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metricText: { fontSize: 12, color: '#444', fontWeight: '500' },
    priceLabel: { fontSize: 12, fontWeight: 'bold', color: '#444' },
    divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 10 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    driverInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    driverAvatar: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center' },
    driverName: { fontSize: 13, fontWeight: 'bold', color: '#333' },
    ratingText: { fontSize: 11, color: '#666', marginLeft: 3 },
    detailsLink: { flexDirection: 'row', alignItems: 'center' },
    detailsText: { fontSize: 12, color: '#666', marginRight: 2 },
});