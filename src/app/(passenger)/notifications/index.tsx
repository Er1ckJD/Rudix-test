// src/app/(passenger)/notifications/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_NOTIFICATIONS } from '@/mocks/notifications';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '@/constants/theme';

import { NotificationType, NotificationItem } from '@/types/notification';

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Contadores
  const unreadCount = notifications.filter((n) => !n.read).length;
  const tripsCount = notifications.filter((n) => n.type === 'trip').length;
  const promosCount = notifications.filter((n) => n.type === 'promo').length;

  // Filtrado
  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    if (activeFilter === 'trips') return notification.type === 'trip';
    if (activeFilter === 'promos') return notification.type === 'promo';
    return true;
  });

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => handleNotificationPress(item.id)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          item.type === 'promo' ? styles.promoIcon : styles.tripIcon,
        ]}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color={Colors.base.white}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="menu" size={28} color={Colors.base.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'all' && styles.filterActive]}
          onPress={() => setActiveFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'all' && styles.filterTextActive,
            ]}
          >
            Todas ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'unread' && styles.filterActive]}
          onPress={() => setActiveFilter('unread')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'unread' && styles.filterTextActive,
            ]}
          >
            No leídas ({unreadCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'trips' && styles.filterActive]}
          onPress={() => setActiveFilter('trips')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'trips' && styles.filterTextActive,
            ]}
          >
            Viajes ({tripsCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'promos' && styles.filterActive]}
          onPress={() => setActiveFilter('promos')}
        >
          <Text
            style={[
              styles.filterText,
              activeFilter === 'promos' && styles.filterTextActive,
            ]}
          >
            Promociones ({promosCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Notificaciones */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Resumen de Actividad */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>Pendiente</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>4</Text>
          <Text style={styles.summaryLabel}>Completo</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryLabel}>Cancelar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.brand.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterActive: {
    backgroundColor: Colors.base.white,
  },
  filterText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.base.white,
  },
  filterTextActive: {
    color: Colors.brand.primary,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100, // Espacio para el resumen
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.brand.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  tripIcon: {
    backgroundColor: Colors.brand.primary,
  },
  promoIcon: {
    backgroundColor: Colors.grey[400],
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  notificationTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.semantic.error,
    marginLeft: Spacing.xs,
  },
  notificationMessage: {
    fontSize: Typography.size.sm,
    color: Colors.light.textSecondary,
    lineHeight: Typography.size.sm * 1.4,
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    fontSize: Typography.size.xs,
    color: Colors.grey[500],
  },
  summaryCard: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.brand.primary,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    padding: Spacing.lg,
    ...Shadows.xl,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
  summaryLabel: {
    fontSize: Typography.size.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: Spacing.xs,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});