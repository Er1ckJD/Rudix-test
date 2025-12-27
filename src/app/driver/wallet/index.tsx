import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BalanceCard from '../../../components/driver/BalanceCard';

// Datos de ejemplo para historial
const recentTransactions = [
  { id: '1', type: 'trip', title: 'Viaje finalizado', date: 'Hoy, 10:30 AM', amount: 85.50 },
  { id: '2', type: 'trip', title: 'Viaje finalizado', date: 'Hoy, 09:15 AM', amount: 120.00 },
  { id: '3', type: 'withdraw', title: 'Retiro a cuenta', date: 'Ayer', amount: -500.00 },
  { id: '4', type: 'bonus', title: 'Bono semanal', date: 'Lun, 12 Oct', amount: 250.00 },
];

export default function WalletScreen() {
  const router = useRouter();

  const handleWithdraw = () => {
    router.push('/driver/wallet/withdraw');
  };

  const handlePaymentMethods = () => {
    router.push('/driver/wallet/payment-methods');
  };

  const renderTransaction = ({ item }: any) => {
    const isPositive = item.amount > 0;
    const iconName = item.type === 'withdraw' ? 'bank-transfer-out' : item.type === 'bonus' ? 'gift' : 'car';
    
    return (
      <View style={styles.transactionItem}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name={iconName} size={24} color="#333" />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: isPositive ? '#000' : '#E53935' }]}>
          {isPositive ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header personalizado si no usas el por defecto de la navegación */}
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Billetera</Text>
         <TouchableOpacity onPress={handlePaymentMethods}>
            <MaterialCommunityIcons name="credit-card-settings-outline" size={26} color="#000" />
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Tarjeta de Saldo */}
        <BalanceCard 
          balance={1850.50} 
          onWithdrawPress={handleWithdraw} 
        />

        {/* Sección de acciones rápidas */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handlePaymentMethods}>
            <View style={styles.actionLeft}>
              <MaterialCommunityIcons name="bank" size={24} color="#000" />
              <Text style={styles.actionText}>Métodos de pago</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
             <View style={styles.actionLeft}>
              <MaterialCommunityIcons name="file-document-outline" size={24} color="#000" />
              <Text style={styles.actionText}>Información fiscal</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Historial Reciente */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          {recentTransactions.map((item) => (
             <React.Fragment key={item.id}>
                {renderTransaction({ item })}
             </React.Fragment>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>Ver toda la actividad</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  scrollContent: { paddingBottom: 30 },
  actionsContainer: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#333' },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
    elevation: 1,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center' },
  actionText: { marginLeft: 12, fontSize: 16, fontWeight: '500' },
  historyContainer: { marginTop: 20, paddingHorizontal: 16 },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: { flex: 1 },
  transactionTitle: { fontSize: 16, fontWeight: '600' },
  transactionDate: { fontSize: 13, color: '#888' },
  transactionAmount: { fontSize: 16, fontWeight: '600' },
  viewAllButton: { padding: 15, alignItems: 'center' },
  viewAllText: { color: '#007AFF', fontWeight: '600' },
});