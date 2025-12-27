import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface BalanceCardProps {
  balance: number;
  currency?: string;
  onWithdrawPress: () => void;
}

const BalanceCard = ({ balance, currency = 'MXN', onWithdrawPress }: BalanceCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <Text style={styles.label}>Saldo Disponible</Text>
        <Text style={styles.balance}>
          ${balance.toFixed(2)} <Text style={styles.currency}>{currency}</Text>
        </Text>
        
        <Text style={styles.subtext}>
          Ganancias de esta semana: $1,250.00
        </Text>
      </View>

      <TouchableOpacity style={styles.withdrawButton} onPress={onWithdrawPress}>
        <Text style={styles.withdrawText}>Retirar</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#000', // Negro elegante o usa tu color primario
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  content: {
    marginBottom: 15,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  balance: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#aaa',
  },
  subtext: {
    color: '#4CAF50', // Verde para indicar ganancia positiva
    fontSize: 13,
    marginTop: 5,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  withdrawText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BalanceCard;