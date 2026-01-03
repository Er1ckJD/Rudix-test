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
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  isDefault: boolean;
};

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: '1', brand: 'Visa', last4: '4242', isDefault: true },
  { id: '2', brand: 'Mastercard', last4: '5555', isDefault: false },
];

export default function PassengerPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(MOCK_PAYMENT_METHODS);

  const renderItem = ({ item }: { item: PaymentMethod }) => (
    <View style={styles.card}>
      <FontAwesome5
        name={item.brand.toLowerCase() === 'visa' ? 'cc-visa' : 'cc-mastercard'}
        size={24}
        color="#333"
      />
      <View style={styles.cardDetails}>
        <ThemedText style={styles.cardBrand}>
          {item.brand} **** {item.last4}
        </ThemedText>
        {item.isDefault && (
          <ThemedText style={styles.defaultBadge}>Predeterminado</ThemedText>
        )}
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Eliminar', 'Próximamente...')}>
        <FontAwesome5 name="trash" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Métodos de Pago</ThemedText>
      </View>
      <FlatList
        data={paymentMethods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText>No tienes métodos de pago.</ThemedText>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert('Agregar', 'Próximamente...')}
      >
        <FontAwesome5 name="plus" size={18} color="white" />
        <Text style={styles.addButtonText}>Agregar nuevo método</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  list: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultBadge: {
    fontSize: 12,
    color: '#28a745',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#007bff',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
