import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DriverSettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [navApp, setNavApp] = useState<'waze' | 'google'>('google');
  const [sound, setSound] = useState(true);
  const [nightMode, setNightMode] = useState(false);

  const SettingItem = ({ icon, label, onPress, value }: any) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.iconBox}>
            <Ionicons name={icon} size={20} color="#555" />
        </View>
        <Text style={styles.itemLabel}>{label}</Text>
        {value ? (
            <Text style={styles.itemValue}>{value}</Text>
        ) : (
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f5f5f5' }]}>
      <Stack.Screen 
        options={{ 
          title: 'Configuración de Conductor', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f5f5f5' },
          headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
            </TouchableOpacity>
          )
        }} 
      />

      <Text style={styles.sectionHeader}>Navegación</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.radioItem} onPress={() => setNavApp('google')}>
            <Ionicons name="map" size={24} color={navApp === 'google' ? Colors.light.primary : '#ccc'} />
            <Text style={styles.radioLabel}>Google Maps</Text>
            {navApp === 'google' && <Ionicons name="checkmark" size={24} color={Colors.light.primary} />}
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.radioItem} onPress={() => setNavApp('waze')}>
            <Ionicons name="navigate" size={24} color={navApp === 'waze' ? Colors.light.primary : '#ccc'} />
            <Text style={styles.radioLabel}>Waze</Text>
            {navApp === 'waze' && <Ionicons name="checkmark" size={24} color={Colors.light.primary} />}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Preferencias de la App</Text>
      <View style={styles.section}>
        <View style={styles.switchItem}>
            <Text style={styles.itemLabel}>Sonidos de alerta</Text>
            <Switch 
                value={sound} onValueChange={setSound} 
                trackColor={{true: Colors.light.primary}} 
            />
        </View>
         <View style={styles.divider} />
         <View style={styles.switchItem}>
            <Text style={styles.itemLabel}>Modo Nocturno (Mapa)</Text>
            <Switch 
                value={nightMode} onValueChange={setNightMode} 
                trackColor={{true: Colors.light.primary}} 
            />
        </View>
      </View>

      <Text style={styles.sectionHeader}>Cuenta</Text>
      <View style={styles.section}>
        <SettingItem icon="car-sport-outline" label="Gestionar Vehículos" onPress={() => {}} value="Nissan Versa" />
        <View style={styles.divider} />
        <SettingItem icon="document-text-outline" label="Documentos" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingItem icon="person-outline" label="Editar Perfil" onPress={() => {}} />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Versión 1.0.5 (Build 2025)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionHeader: { fontSize: 13, fontWeight: 'bold', color: '#888', marginBottom: 10, marginTop: 10, textTransform: 'uppercase' },
  section: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  iconBox: { width: 30, alignItems: 'center', marginRight: 10 },
  itemLabel: { flex: 1, fontSize: 16, color: '#333' },
  itemValue: { fontSize: 14, color: '#888', marginRight: 5 },
  switchItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
  radioItem: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  radioLabel: { flex: 1, marginLeft: 15, fontSize: 16 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 50 },
  logoutBtn: { marginTop: 30, padding: 15, alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#ffcccc' },
  logoutText: { color: '#d32f2f', fontWeight: 'bold' },
  version: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 20, marginBottom: 40 },
});