import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import BalanceCard from '@/components/driver/BalanceCard';
import WeeklyChart from '@/components/driver/WeeklyChart';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Datos de ejemplo para movimientos
const TRANSACTIONS = [
  { id: '1', title: 'Viaje finalizado #1234', date: 'Hoy, 2:30 PM', amount: '+$85.00', type: 'income' },
  { id: '2', title: 'Viaje finalizado #1230', date: 'Hoy, 1:15 PM', amount: '+$120.50', type: 'income' },
  { id: '3', title: 'Retiro a cuenta *9932', date: 'Ayer', amount: '-$500.00', type: 'withdraw' },
  { id: '4', title: 'Bono semanal', date: 'Lun', amount: '+$200.00', type: 'income' },
];

export default function WalletScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const renderTransaction = ({ item }: any) => (
    <View style={styles.transItem}>
        <View style={[styles.iconBox, { backgroundColor: item.type === 'income' ? '#E8F5E9' : '#FFEBEE' }]}>
            <Ionicons 
                name={item.type === 'income' ? 'car-outline' : 'cash-outline'} 
                size={20} 
                color={item.type === 'income' ? Colors.light.primary : '#D32F2F'} 
            />
        </View>
        <View style={styles.transInfo}>
            <Text style={styles.transTitle}>{item.title}</Text>
            <Text style={styles.transDate}>{item.date}</Text>
        </View>
        <Text style={[styles.transAmount, { color: item.type === 'income' ? Colors.light.primary : '#333' }]}>
            {item.amount}
        </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Billetera', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.grey[200] },
          headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
            </TouchableOpacity>
          )
        }} 
      />
      <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.grey[200] }]} showsVerticalScrollIndicator={false}>
        {/* 1. Tarjeta de Saldo */}
        <BalanceCard 
          balance="$1,850.50" 
          onWithdraw={() => router.push('/driver/wallet/withdraw')} 
        />

        {/* 2. Gráfica */}
        <WeeklyChart />

        {/* 3. Lista de Movimientos */}
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
              <Text style={styles.sectionTitle}>Movimientos Recientes</Text>
              <TouchableOpacity>
                  <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
          </View>

          <FlatList
              data={TRANSACTIONS}
              renderItem={renderTransaction}
              keyExtractor={item => item.id}
              scrollEnabled={false} // Usamos el scroll del padre
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  historyContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 20, paddingBottom: 10 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  seeAll: { color: Colors.light.primary, fontSize: 13, fontWeight: '600' },
  
  transItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  transInfo: { flex: 1 },
  transTitle: { fontSize: 14, fontWeight: '600', color: '#333' },
  transDate: { fontSize: 12, color: '#999', marginTop: 2 },
  transAmount: { fontSize: 15, fontWeight: 'bold' },
});