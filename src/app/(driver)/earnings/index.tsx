import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Redirect, Stack, useNavigation } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius, Shadows, hexWithOpacity } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/native';

interface Transaction {
  id: string;
  type: 'trip' | 'withdraw' | 'bonus';
  title: string;
  date: string;
  amount: number;
}

const recentTransactions: Transaction[] = [
  { id: '1', type: 'trip', title: 'Viaje finalizado', date: 'Hoy, 10:30 AM', amount: 85.50 },
  { id: '2', type: 'trip', title: 'Viaje finalizado', date: 'Hoy, 09:15 AM', amount: 120.00 },
  { id: '3', type: 'withdraw', title: 'Retiro a cuenta', date: 'Ayer', amount: -500.00 },
  { id: '4', type: 'bonus', title: 'Bono semanal', date: 'Lun, 12 Oct', amount: 250.00 },
];

export default function WalletScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.brand.primary} />
        </View>
    );
  }

  if (!user || !user.roles?.includes('driver')) {
    return <Redirect href="/(passenger)/(home)" />;
  }

  const handleWithdraw = () => {
    router.push('/(driver)/earnings/withdraw');
  };

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const isPositive = item.amount > 0;
    const iconName = item.type === 'withdraw' ? 'bank-transfer-out' : item.type === 'bonus' ? 'gift' : 'car';
    
    return (
      <View style={styles.transactionItem}>
        <View style={[styles.iconBox, {backgroundColor: isPositive ? Colors.brand.primary+'20' : Colors.semantic.error+'20'}]}>
          <MaterialCommunityIcons name={iconName} size={24} color={isPositive ? Colors.brand.primary : Colors.semantic.error} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
        <Text style={[styles.transactionAmount, { color: isPositive ? Colors.semantic.success : Colors.semantic.error }]}>
          {isPositive ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown: false}}/>
      <LinearGradient colors={[Colors.grey[100], Colors.base.white]} style={styles.background} />
      
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={24} color={Colors.light.text} />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Mi Billetera</Text>
         <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors.light.text} />
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <LinearGradient
            colors={[Colors.brand.primary, Colors.brand.primaryLight]}
            style={styles.balanceCard}
        >
            <Text style={styles.balanceLabel}>Balance Actual</Text>
            <Text style={styles.balanceAmount}>$2,850.50</Text>
            <View style={styles.balanceActions}>
                <TouchableOpacity style={styles.balanceButton} onPress={handleWithdraw}>
                    <Ionicons name="arrow-down-circle-outline" size={20} color={Colors.brand.primary}/>
                    <Text style={styles.balanceButtonText}>Retirar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.balanceButton}>
                    <Ionicons name="add-circle-outline" size={20} color={Colors.brand.primary}/>
                    <Text style={styles.balanceButtonText}>Depositar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>

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
  container: { flex: 1, backgroundColor: Colors.base.white },
  background: { ...StyleSheet.absoluteFillObject },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.light.text },
  scrollContent: { paddingBottom: 30, paddingHorizontal: Spacing.lg },

  balanceCard: {
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      ...Shadows.lg,
      marginBottom: Spacing.xl,
  },
  balanceLabel: {
      color: hexWithOpacity(Colors.base.white, 0.8),
      fontSize: Typography.size.base,
      marginBottom: Spacing.xs,
  },
  balanceAmount: {
      color: Colors.base.white,
      fontSize: 48,
      fontWeight: 'bold',
      marginBottom: Spacing.lg,
  },
  balanceActions: {
      flexDirection: 'row',
      gap: Spacing.md,
  },
  balanceButton: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.base.white,
      paddingVertical: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: BorderRadius.lg,
      gap: Spacing.sm,
  },
  balanceButtonText: {
      color: Colors.brand.primary,
      fontWeight: 'bold',
      fontSize: Typography.size.base,
  },

  historyContainer: { 
      backgroundColor: Colors.base.white,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      ...Shadows.md
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: Colors.light.text },

  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: { flex: 1 },
  transactionTitle: { fontSize: 16, fontWeight: '600', color: Colors.light.text },
  transactionDate: { fontSize: 13, color: Colors.light.textSecondary, marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  viewAllButton: { padding: 15, alignItems: 'center', marginTop: 10 },
  viewAllText: { color: Colors.brand.primary, fontWeight: '600', fontSize: Typography.size.base },
});