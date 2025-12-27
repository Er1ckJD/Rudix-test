import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notif, setNotif] = useState(true);
  const [loc, setLoc] = useState(true);
  const [dnd, setDnd] = useState(true);

  const ToggleRow = ({ icon, title, subtitle, value, onValueChange }: any) => (
      <View style={styles.row}>
          <Ionicons name={icon} size={24} color={Colors.light.primary} style={{marginRight: 10}} />
          <View style={{flex: 1}}>
              <Text style={styles.rowTitle}>{title}</Text>
              {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
          </View>
          <Switch 
            value={value} 
            onValueChange={onValueChange} 
            trackColor={{false: '#767577', true: Colors.light.primary}}
            thumbColor={'#fff'}
          />
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Activa las notificaciones de tus próximos viajes</Text>
      
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <View style={styles.togglesContainer}>
          <ToggleRow 
            icon="notifications-outline" 
            title="Activar Notificaciones" 
            value={notif} onValueChange={setNotif} 
          />
          <ToggleRow 
            icon="location-outline" 
            title="Ubicación para siempre" 
            subtitle="Visualización de solicitudes cercanas"
            value={loc} onValueChange={setLoc} 
          />
          <ToggleRow 
            icon="moon-outline" 
            title="No molestar" 
            subtitle="Bloquearás notificaciones de futuros viajes"
            value={dnd} onValueChange={setDnd} 
          />
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/driver/register/success')}>
              <Text style={styles.btnText}>Siguiente</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginTop: 30, marginBottom: 20 },
  image: { width: 120, height: 120, marginBottom: 40, alignSelf: 'center' },
  togglesContainer: { width: '100%', gap: 15, marginBottom: 40 },
  row: { 
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', 
      padding: 15, borderRadius: 15, 
      elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3 
  },
  rowTitle: { color: '#666', fontSize: 14 },
  rowSubtitle: { color: '#999', fontSize: 10 },
  footer: {
    marginTop: 'auto',
    width: '100%',
  },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
