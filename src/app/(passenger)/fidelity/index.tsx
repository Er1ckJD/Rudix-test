import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// 1. Imports
import { useRouter, Stack, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '@/constants/theme';

export default function PassengerFidelityScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // 2. Inicializar

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Personalizado */}
        <View style={styles.header}>
          {/* 3. CORREGIR BOTÓN */}
          <TouchableOpacity 
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color={Colors.light.text} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Mi Nivel Fidelity</Text>
          <View style={{ width: 28 }} /> 
        </View>

        {/* ... resto del contenido ... */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.surface },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  menuButton: { padding: Spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: 'bold' }
});