import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WithdrawScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const maxBalance = 1850.50; // Esto vendría de tu backend/contexto

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido.');
      return;
    }
    if (val > maxBalance) {
      Alert.alert('Saldo insuficiente', 'No tienes suficiente saldo disponible.');
      return;
    }
    // Lógica de retiro aquí
    Alert.alert('Éxito', `Se ha procesado tu retiro de $${val}`, [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Retirar dinero</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <View style={styles.content}>
        <Text style={styles.balanceLabel}>Disponible para retirar</Text>
        <Text style={styles.balanceValue}>${maxBalance.toFixed(2)}</Text>

        <View style={styles.inputContainer}>
           <Text style={styles.currencySymbol}>$</Text>
           <TextInput
             style={styles.input}
             placeholder="0.00"
             keyboardType="numeric"
             value={amount}
             onChangeText={setAmount}
             autoFocus
           />
        </View>

        <View style={styles.destinationCard}>
          <View>
            <Text style={styles.destinationLabel}>Destino</Text>
            <Text style={styles.destinationValue}>BBVA Bancomer •••• 4589</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/driver/wallet/payment-methods')}>
             <Text style={styles.changeText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleWithdraw}>
          <Text style={styles.confirmText}>Confirmar Retiro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  closeButton: { padding: 4 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  balanceLabel: { textAlign: 'center', color: '#666', fontSize: 14 },
  balanceValue: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  currencySymbol: { fontSize: 40, fontWeight: '300', color: '#000' },
  input: { fontSize: 40, fontWeight: '300', color: '#000', minWidth: 100, textAlign: 'center' },
  destinationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  destinationLabel: { fontSize: 12, color: '#666' },
  destinationValue: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  changeText: { color: '#007AFF', fontWeight: '600' },
  footer: { padding: 20, paddingBottom: 40 },
  confirmButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});