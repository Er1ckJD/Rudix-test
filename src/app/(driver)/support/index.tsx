import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SupportScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const FaqItem = ({ title }: { title: string }) => (
    <TouchableOpacity style={styles.faqItem}>
        <Text style={styles.faqText}>{title}</Text>
        <Ionicons name="chevron-forward" size={18} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f9f9f9' }]}>
      <Stack.Screen 
        options={{ 
          title: 'Centro de Ayuda', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f9f9f9' },
          headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={{marginRight: 10}} />
        <TextInput 
            placeholder="¿Cómo podemos ayudarte?" 
            style={{flex: 1, fontSize: 16}}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Acciones Rápidas */}
        <Text style={styles.sectionTitle}>Contacto Directo</Text>
        <View style={styles.contactRow}>
            <TouchableOpacity style={styles.contactCard}>
                <View style={[styles.iconCircle, {backgroundColor: '#E3F2FD'}]}>
                    <Ionicons name="chatbubbles" size={24} color="#1976D2" />
                </View>
                <Text style={styles.contactLabel}>Chat en Vivo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactCard}>
                <View style={[styles.iconCircle, {backgroundColor: '#FFEBEE'}]}>
                    <Ionicons name="call" size={24} color="#D32F2F" />
                </View>
                <Text style={styles.contactLabel}>Línea de Emergencia</Text>
            </TouchableOpacity>
        </View>

        {/* Último Viaje (Contexto) */}
        <View style={styles.tripCard}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.tripTitle}>Problema con último viaje</Text>
                <Text style={styles.tripDate}>Hoy, 10:30 AM</Text>
            </View>
            <Text style={styles.tripRoute}>Centro Histórico → Plaza Las Américas</Text>
            <TouchableOpacity style={styles.reportBtn}>
                <Text style={styles.reportText}>Reportar problema</Text>
            </TouchableOpacity>
        </View>

        {/* Preguntas Frecuentes */}
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
        <View style={styles.faqList}>
            <FaqItem title="No recibí el pago de mi viaje" />
            <FaqItem title="¿Cómo cambio mi cuenta bancaria?" />
            <FaqItem title="El pasajero ensució mi vehículo" />
            <FaqItem title="Revisión de documentos pendientes" />
            <FaqItem title="Entender mi nivel de Fidelity" />
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 20, padding: 15, borderRadius: 10, elevation: 2 },
  scroll: { paddingHorizontal: 20 },
  
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },
  
  contactRow: { flexDirection: 'row', gap: 15, marginBottom: 25 },
  contactCard: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', elevation: 1 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  contactLabel: { fontWeight: '600', color: '#555' },

  tripCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 25, borderLeftWidth: 4, borderLeftColor: Colors.light.primary },
  tripTitle: { fontWeight: 'bold', color: '#333' },
  tripDate: { fontSize: 12, color: '#999' },
  tripRoute: { color: '#666', marginVertical: 8, fontSize: 13 },
  reportBtn: { alignSelf: 'flex-start' },
  reportText: { color: Colors.light.primary, fontWeight: 'bold', fontSize: 13 },

  faqList: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 30 },
  faqItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqText: { color: '#444', fontSize: 14 },
});