import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// 1. IMPORTANTE: Agregar estos imports
import { useRouter, Stack, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native'; 
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';

export default function DriverFidelityScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // 2. Inicializar navigation

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'RuDix Fidelity',
          headerShadowVisible: false,
          // ... otros estilos ...
          
          // 3. CAMBIAR ESTO:
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Ionicons name="menu" size={24} color={Colors.light.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      {/* ... resto del contenido ... */}
      <ScrollView>
         <Text style={{padding: 20}}>Contenido de Fidelity Conductor...</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.surface },
});