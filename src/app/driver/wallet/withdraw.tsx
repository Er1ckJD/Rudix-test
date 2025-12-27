import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function WithdrawScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <Text style={styles.label}>Monto a retirar</Text>
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
        <Text style={styles.helperText}>Disponible: $1,850.50</Text>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta destino</Text>
            <TouchableOpacity style={styles.bankCard} onPress={() => router.push('/driver/wallet/payment-methods')}>
                <View style={styles.bankIcon}>
                    <Ionicons name="card" size={24} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.bankName}>BBVA Bancomer</Text>
                    <Text style={styles.bankNumber}>**** 9932</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={[styles.btn, !amount && styles.btnDisabled]} 
            disabled={!amount}
            onPress={() => alert('¡Retiro procesado!')} // Aquí conectarías tu API
        >
            <Text style={styles.btnText}>Confirmar Retiro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  label: { fontSize: 16, color: '#666', marginBottom: 10, textAlign: 'center', marginTop: 20 },
  inputContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  currencySymbol: { fontSize: 40, fontWeight: 'bold', color: '#333', marginRight: 5 },
  input: { fontSize: 50, fontWeight: 'bold', color: '#333', minWidth: 100, textAlign: 'center' },
  helperText: { textAlign: 'center', color: Colors.light.primary, fontWeight: 'bold', marginBottom: 40 },
  
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 15, textTransform: 'uppercase' },
  
  bankCard: { 
      backgroundColor: '#fff', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 15,
      elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  bankIcon: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#004481', alignItems: 'center', justifyContent: 'center' },
  bankName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  bankNumber: { color: '#888' },

  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  btn: { backgroundColor: Colors.light.primary, padding: 18, borderRadius: 30, alignItems: 'center' },
  btnDisabled: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});