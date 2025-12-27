import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface BalanceCardProps {
  balance: string;
  onWithdraw: () => void;
}

export default function BalanceCard({ balance, onWithdraw }: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>Saldo Disponible</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>
      
      <TouchableOpacity style={styles.withdrawBtn} onPress={onWithdraw}>
        <Text style={styles.withdrawText}>Retirar</Text>
        <Ionicons name="arrow-forward-circle" size={24} color={Colors.light.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24, // Bordes más redondeados (estilo iOS 15+)
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // Sombra "Premium"
    shadowColor: Colors.light.primary, // Sombra con tinte verde
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10, // Para Android
  },
  label: { fontSize: 14, color: '#888', marginBottom: 5 },
  balance: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // Verde muy claro
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 5
  },
  withdrawText: { color: Colors.light.primary, fontWeight: 'bold', fontSize: 14 },
});