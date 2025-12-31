import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function FidelityScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const BenefitCard = ({ icon, title, desc, locked }: any) => (
    <View style={[styles.benefitCard, locked && styles.benefitLocked]}>
        <View style={[styles.benefitIcon, { backgroundColor: locked ? '#eee' : '#E8F5E9' }]}>
            <MaterialCommunityIcons 
                name={icon} 
                size={24} 
                color={locked ? '#999' : Colors.light.primary} 
            />
        </View>
        <View style={{flex: 1}}>
            <Text style={[styles.benefitTitle, locked && {color: '#999'}]}>{title}</Text>
            <Text style={styles.benefitDesc}>{desc}</Text>
        </View>
        {locked && <Ionicons name="lock-closed" size={16} color="#999" />}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : '#f9f9f9' }]}>
      <Stack.Screen 
        options={{ 
          title: 'RuDix Fidelity', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.levelBadge}>
              <MaterialCommunityIcons name="crown" size={40} color="#FFD700" />
              <Text style={styles.levelText}>Nivel ORO</Text>
              <Text style={styles.pointsText}>1,250 pts</Text>
          </View>
        </View>

        <View style={styles.scrollContent}>
          <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>Próximo nivel: Diamante</Text>
              <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '70%' }]} />
              </View>
              <Text style={styles.progressSub}>Faltan 250 puntos para subir</Text>
          </View>

          <View style={styles.statsRow}>
              <View style={styles.statItem}>
                  <Text style={styles.statNum}>4.98</Text>
                  <Text style={styles.statLabel}>Calificación</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                  <Text style={styles.statNum}>98%</Text>
                  <Text style={styles.statLabel}>Aceptación</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                  <Text style={styles.statNum}>450</Text>
                  <Text style={styles.statLabel}>Viajes</Text>
              </View>
          </View>

          <Text style={styles.sectionTitle}>Tus Beneficios Oro</Text>
          <BenefitCard 
              icon="gas-station" 
              title="Descuento en Gasolina" 
              desc="Ahorra hasta $2.00 por litro en estaciones aliadas." 
          />
          <BenefitCard 
              icon="car-wrench" 
              title="Mantenimiento Preventivo" 
              desc="15% de descuento en servicios y refacciones." 
          />
          <BenefitCard 
              icon="headset" 
              title="Soporte Prioritario" 
              desc="Atención telefónica directa 24/7." 
          />

          <Text style={[styles.sectionTitle, {marginTop: 20}]}>Próximos Beneficios (Diamante)</Text>
          <BenefitCard 
              icon="cash-multiple" 
              title="Bonos Semanales" 
              desc="Acceso a bonos exclusivos por metas." 
              locked
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { backgroundColor: '#1a1a1a', padding: 20, paddingTop: 10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
  levelBadge: { alignItems: 'center', marginBottom: 10 },
  levelText: { color: '#FFD700', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  pointsText: { color: '#ccc', fontSize: 14 },
  scrollContent: { padding: 20 },
  progressSection: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginTop: -30, elevation: 4, shadowColor: '#000', shadowOpacity: 0.1 },
  progressLabel: { fontWeight: 'bold', marginBottom: 10, color: '#333' },
  progressBarBg: { height: 10, backgroundColor: '#eee', borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: Colors.light.primary },
  progressSub: { fontSize: 11, color: '#888', marginTop: 8, textAlign: 'right' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 25 },
  statItem: { alignItems: 'center', flex: 1 },
  statNum: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 12, color: '#666' },
  statDivider: { width: 1, height: '100%', backgroundColor: '#ddd' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  benefitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, gap: 15, elevation: 1 },
  benefitLocked: { opacity: 0.7, backgroundColor: '#f5f5f5' },
  benefitIcon: { width: 45, height: 45, borderRadius: 22.5, alignItems: 'center', justifyContent: 'center' },
  benefitTitle: { fontWeight: 'bold', fontSize: 14, color: '#333' },
  benefitDesc: { fontSize: 12, color: '#666', marginTop: 2 },
});