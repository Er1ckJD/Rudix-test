import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  isDefault: boolean;
  exp: string;
};

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: '1', brand: 'Visa', last4: '4242', isDefault: true, exp: '12/28' },
  { id: '2', brand: 'Mastercard', last4: '5555', isDefault: false, exp: '08/26'},
];

export default function PassengerPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(MOCK_PAYMENT_METHODS);
  const router = useRouter();

  const renderItem = ({ item }: { item: PaymentMethod }) => (
    <LinearGradient
        colors={item.isDefault ? ['#108A33', '#15B545'] : ['#333', '#555']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
    >
        <View style={styles.cardHeader}>
            <FontAwesome5
                name={item.brand.toLowerCase() === 'visa' ? 'cc-visa' : 'cc-mastercard'}
                size={36}
                color="white"
            />
            {item.isDefault && (
                <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Predeterminado</Text>
                </View>
            )}
        </View>
        <Text style={styles.cardNumber}>**** **** **** {item.last4}</Text>
        <View style={styles.cardFooter}>
            <Text style={styles.cardExp}>Expira: {item.exp}</Text>
            <TouchableOpacity onPress={() => Alert.alert('Eliminar', 'Próximamente...')}>
                <Ionicons name="trash-outline" size={22} color="white" />
            </TouchableOpacity>
        </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Métodos de Pago</Text>
        <View style={{width: 24}}/>
      </View>

      <FlatList
        data={paymentMethods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="wallet-outline" size={64} color={Colors.grey[400]}/>
            <Text style={styles.emptyText}>Aún no tienes métodos de pago</Text>
            <Text style={styles.emptySubtitle}>Agrega una tarjeta para tus viajes.</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/profile/add-card')}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar Nueva Tarjeta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: 'white',
  },
  headerTitle: {
      fontSize: Typography.size.lg,
      fontWeight: Typography.weight.bold,
  },
  list: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
      fontSize: Typography.size.lg,
      fontWeight: Typography.weight.semibold,
      marginTop: Spacing.md,
      color: Colors.grey[600],
  },
  emptySubtitle: {
    fontSize: Typography.size.base,
    color: Colors.grey[500],
    marginTop: Spacing.xs,
  },
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xxl,
  },
  defaultBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.sm,
  },
  defaultBadgeText: {
      color: 'white',
      fontSize: Typography.size.xs,
      fontWeight: Typography.weight.bold,
  },
  cardNumber: {
      color: 'white',
      fontSize: Typography.size.lg,
      fontFamily: 'monospace',
      letterSpacing: 2,
      marginBottom: Spacing.md,
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  cardExp: {
      color: 'white',
      fontSize: Typography.size.sm,
  },
  addButton: {
    backgroundColor: Colors.brand.primary,
    margin: 20,
    padding: 15,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
