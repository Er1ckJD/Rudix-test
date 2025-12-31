// app/(passenger)/(home)/history.tsx (OPTIMIZADA)
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Componentes del sistema de diseño
import Screen from '@/components/ui/Screen';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SkeletonTripCard } from '@/components/ui/Loading';

// Theme
import { Colors, Spacing, Typography, CommonStyles } from '@/constants/theme';

// Utilidades
import {
  useDebounce,
  OptimizedFlatListConfig,
  createKeyExtractor,
  useRenderCount,
} from '@/utils/performance';

// Tipos
import { Trip, TripStatus } from '@/types/trip';

// ============================================
// DATOS MOCK (reemplazar con API)
// ============================================

const MOCK_TRIPS: Trip[] = [
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
      vehiclePlate: 'A23348*D',
    },
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
      vehiclePlate: 'B9912*Z',
    },
  },
  // Agregar más trips...
];

// ============================================
// FILTROS
// ============================================

type FilterType = 'all' | 'completed' | 'cancelled';

const FILTERS: Array<{ key: FilterType; label: string }> = [
  { key: 'all', label: 'Todos' },
  { key: 'completed', label: 'Completados' },
  { key: 'cancelled', label: 'Cancelados' },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function HistoryScreen() {
  const router = useRouter();
  
  // Estado
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Performance monitoring (solo dev)
  if (__DEV__) {
    useRenderCount('HistoryScreen');
  }

  // Debounce del search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filtrar y buscar trips
  const filteredTrips = useMemo(() => {
    let trips = MOCK_TRIPS;

    // Filtrar por estado
    if (selectedFilter !== 'all') {
      trips = trips.filter((trip) => trip.status === selectedFilter);
    }

    // Buscar por dirección
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      trips = trips.filter(
        (trip) =>
          trip.pickupAddress.toLowerCase().includes(query) ||
          trip.dropoffAddress.toLowerCase().includes(query)
      );
    }

    return trips;
  }, [selectedFilter, debouncedSearch]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simular fetch
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleTripPress = useCallback(
    (tripId: string) => {
      const tripData = JSON.stringify(
        MOCK_TRIPS.find((t) => t.id === tripId)
      );
      router.push({
        pathname: '/history/details',
        params: { tripData },
      });
    },
    [router]
  );

  const handleFilterPress = useCallback((filter: FilterType) => {
    setSelectedFilter(filter);
  }, []);

  // ============================================
  // RENDER ITEMS
  // ============================================

  const renderTripItem = useCallback(
    ({ item }: { item: Trip }) => (
      <TripCard trip={item} onPress={() => handleTripPress(item.id)} />
    ),
    [handleTripPress]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Ionicons name="car-outline" size={64} color={Colors.grey[400]} />
        <Text style={styles.emptyTitle}>No hay viajes</Text>
        <Text style={styles.emptySubtitle}>
          Tus viajes {selectedFilter !== 'all' ? selectedFilter : ''} aparecerán aquí
        </Text>
        <Button
          title="Solicitar Viaje"
          variant="primary"
          gradient
          onPress={() => router.push('/(passenger)/(home)')}
          style={{ marginTop: Spacing.lg }}
        />
      </View>
    ),
    [selectedFilter, router]
  );

  const renderFooter = useCallback(
    () =>
      refreshing ? (
        <View style={styles.loadingFooter}>
          <SkeletonTripCard />
        </View>
      ) : null,
    [refreshing]
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <Screen scrollable={false}>
      {/* Header con filtros */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial de Viajes</Text>
        
        <View style={styles.filtersContainer}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                selectedFilter === filter.key && styles.filterChipActive,
              ]}
              onPress={() => handleFilterPress(filter.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista optimizada */}
      <FlatList
        data={filteredTrips}
        renderItem={renderTripItem}
        keyExtractor={createKeyExtractor('trip')}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        {...OptimizedFlatListConfig}
      />
    </Screen>
  );
}

// ============================================
// SUB-COMPONENTE: TRIP CARD (MEMOIZADO)
// ============================================

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
}

const TripCard = React.memo(({ trip, onPress }: TripCardProps) => (
  <Card variant="elevated" padding="md" style={styles.tripCard} onPress={onPress}>
    {/* Header */}
    <View style={styles.tripHeader}>
      <View style={CommonStyles.row}>
        <Ionicons name="calendar-outline" size={14} color={Colors.grey[600]} />
        <Text style={styles.tripDate}>{trip.date}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          trip.status === 'completed' ? styles.statusSuccess : styles.statusCancel,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                trip.status === 'completed'
                  ? Colors.brand.primary
                  : Colors.semantic.error,
            },
          ]}
        >
          {trip.status === 'completed' ? 'Completado' : 'Cancelado'}
        </Text>
      </View>
    </View>

    {/* Route */}
    <View style={styles.routeContainer}>
      <View style={styles.routeDots}>
        <View style={styles.dotGrey} />
        <View style={styles.routeLine} />
        <View style={styles.dotGreen} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.address} numberOfLines={1}>
          {trip.pickupAddress}
        </Text>
        <View style={{ height: 20 }} />
        <Text style={styles.address} numberOfLines={1}>
          {trip.dropoffAddress}
        </Text>
      </View>
      <View style={styles.metricsColumn}>
        <View style={CommonStyles.row}>
          <Ionicons name="time-outline" size={14} color={Colors.grey[600]} />
          <Text style={styles.metricText}>{trip.duration}</Text>
        </View>
        <View style={[CommonStyles.row, { marginTop: Spacing.xs }]}>
          <Ionicons name="location-outline" size={14} color={Colors.grey[600]} />
          <Text style={styles.metricText}>{trip.distance}</Text>
        </View>
      </View>
    </View>

    <Card.Divider />

    {/* Footer */}
    <View style={CommonStyles.rowBetween}>
      <View style={CommonStyles.row}>
        <View style={styles.driverAvatar}>
          <Text style={styles.driverInitials}>
            {trip.driver?.name[0]}
          </Text>
        </View>
        <View style={{ marginLeft: Spacing.sm }}>
          <Text style={styles.driverName}>{trip.driver?.name}</Text>
          <View style={CommonStyles.row}>
            <Ionicons name="star" size={12} color={Colors.semantic.warning} />
            <Text style={styles.ratingText}>{trip.driver?.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.price}>{trip.price}</Text>
    </View>
  </Card>
));

TripCard.displayName = 'TripCard';

// ============================================
// ESTILOS
// ============================================

const styles = StyleSheet.create({
  // Header
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.light.background,
  },
  headerTitle: {
    ...CommonStyles.h2,
    marginBottom: Spacing.md,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  filterChip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.grey[100],
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  filterChipActive: {
    backgroundColor: Colors.brand.primary,
    borderColor: Colors.brand.primary,
  },
  filterText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.grey[700],
  },
  filterTextActive: {
    color: Colors.base.white,
  },

  // Lista
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.sm,
  },

  // Trip Card
  tripCard: {
    marginBottom: Spacing.md,
  },
  tripHeader: {
    ...CommonStyles.rowBetween,
    marginBottom: Spacing.md,
  },
  tripDate: {
    fontSize: Typography.size.sm,
    color: Colors.grey[600],
    marginLeft: Spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusSuccess: {
    backgroundColor: Colors.brand.primary + '15',
  },
  statusCancel: {
    backgroundColor: Colors.semantic.error + '15',
  },
  statusText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  routeDots: {
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  dotGrey: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.grey[400],
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.grey[300],
    marginVertical: 4,
  },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.brand.primary,
  },
  address: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontWeight: Typography.weight.medium,
  },
  metricsColumn: {
    alignItems: 'flex-end',
  },
  metricText: {
    fontSize: Typography.size.xs,
    color: Colors.grey[700],
    marginLeft: Spacing.xs,
  },
  driverAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInitials: {
    color: Colors.base.white,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.sm,
  },
  driverName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
  },
  ratingText: {
    fontSize: Typography.size.xs,
    color: Colors.grey[600],
    marginLeft: 4,
  },
  price: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyTitle: {
    ...CommonStyles.h3,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    ...CommonStyles.body,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },

  // Loading
  loadingFooter: {
    paddingVertical: Spacing.md,
  },
});
