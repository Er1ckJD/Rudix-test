import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const paymentMethods = [
  { id: '1', type: 'bank', name: 'BBVA Bancomer', last4: '4589', isDefault: true },
  { id: '2', type: 'card', name: 'Santander Débito', last4: '1234', isDefault: false },
];

export default function PaymentMethodsScreen() {
  const router = useRouter();

  const handleAddMethod = () => {
    Alert.alert('Añadir método', 'Aquí iría el flujo para añadir tarjeta o CLABE.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Métodos de Pago</Text>
      </View>

      <Text style={styles.subtitle}>Cuentas vinculadas para recibir ganancias</Text>

      <View style={styles.listContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity key={method.id} style={styles.methodCard}>
            <MaterialCommunityIcons 
              name={method.type === 'bank' ? 'bank' : 'credit-card'} 
              size={28} 
              color="#333" 
            />
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodDetails}>•••• {method.last4}</Text>
            </View>
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Principal</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddMethod}>
        <MaterialCommunityIcons name="plus" size={24} color="#007AFF" />
        <Text style={styles.addText}>Añadir cuenta bancaria o tarjeta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: { marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: {
    padding: 16,
    color: '#666',
    fontSize: 14,
  },
  listContainer: { paddingHorizontal: 16 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  methodInfo: { flex: 1, marginLeft: 16 },
  methodName: { fontSize: 16, fontWeight: '600' },
  methodDetails: { color: '#888', marginTop: 2 },
  defaultBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: { color: '#007AFF', fontSize: 12, fontWeight: '600' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
  },
  addText: { color: '#007AFF', fontSize: 16, fontWeight: '600', marginLeft: 8 },
});