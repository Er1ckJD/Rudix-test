import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, Stack, useNavigation } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Shadows, hexWithOpacity } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DrawerActions } from '@react-navigation/native';

export default function FidelityScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const BenefitCard = ({ icon, title, desc, locked }: any) => (
    <View style={[styles.benefitCard, isDark && styles.benefitCardDark, locked && styles.benefitLocked]}>
        <View style={[styles.benefitIcon, { backgroundColor: locked ? Colors.grey[isDark ? 800 : 200] : hexWithOpacity(Colors.brand.primary, 0.1) }]}>
            <MaterialCommunityIcons 
                name={icon} 
                size={24} 
                color={locked ? Colors.grey[500] : Colors.brand.primary} 
            />
        </View>
        <View style={{flex: 1}}>
            <Text style={[styles.benefitTitle, isDark && styles.textDark, locked && {color: Colors.grey[500]}]}>{title}</Text>
            <Text style={[styles.benefitDesc, isDark && styles.textDarkSecondary]}>{desc}</Text>
        </View>
        {locked && <Ionicons name="lock-closed" size={16} color={Colors.grey[500]} />}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen 
        options={{ 
          title: 'RuDix Fidelity', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.dark.background },
          headerTintColor: Colors.dark.text,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 10 }}>
              <Ionicons name="menu" size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.levelBadge}>
              <MaterialCommunityIcons name="crown" size={40} color={Colors.common.gold} />
              <Text style={styles.levelText}>Nivel ORO</Text>
              <Text style={styles.pointsText}>1,250 pts</Text>
          </View>
        </View>

        <View style={styles.scrollContent}>
          <View style={[styles.progressSection, isDark && styles.progressSectionDark]}>
              <Text style={[styles.progressLabel, isDark && styles.textDark]}>Próximo nivel: Diamante</Text>
              <View style={[styles.progressBarBg, isDark && styles.progressBarBgDark]}>
                  <View style={[styles.progressBarFill, { width: '70%' }]} />
              </View>
              <Text style={[styles.progressSub, isDark && styles.textDarkSecondary]}>Faltan 250 puntos para subir</Text>
          </View>

          <View style={styles.statsRow}>
              <View style={styles.statItem}>
                  <Text style={[styles.statNum, isDark && styles.textDark]}>4.98</Text>
                  <Text style={[styles.statLabel, isDark && styles.textDarkSecondary]}>Calificación</Text>
              </View>
              <View style={[styles.statDivider, isDark && styles.statDividerDark]} />
              <View style={styles.statItem}>
                  <Text style={[styles.statNum, isDark && styles.textDark]}>98%</Text>
                  <Text style={[styles.statLabel, isDark && styles.textDarkSecondary]}>Aceptación</Text>
              </View>
              <View style={[styles.statDivider, isDark && styles.statDividerDark]} />
              <View style={styles.statItem}>
                  <Text style={[styles.statNum, isDark && styles.textDark]}>450</Text>
                  <Text style={[styles.statLabel, isDark && styles.textDarkSecondary]}>Viajes</Text>
              </View>
          </View>

          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Tus Beneficios Oro</Text>
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

          <Text style={[styles.sectionTitle, {marginTop: 20}, isDark && styles.textDark]}>Próximos Beneficios (Diamante)</Text>
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
  container: { flex: 1, backgroundColor: Colors.grey[50] },
  containerDark: { backgroundColor: Colors.dark.background },
  textDark: { color: Colors.dark.text },
  textDarkSecondary: { color: Colors.dark.textSecondary },
  header: { backgroundColor: Colors.dark.background, padding: 20, paddingTop: 10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
  levelBadge: { alignItems: 'center', marginBottom: 10 },
  levelText: { color: Colors.common.gold, fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  pointsText: { color: Colors.grey[400], fontSize: 14 },
  scrollContent: { padding: 20 },
  progressSection: { backgroundColor: Colors.base.white, padding: 20, borderRadius: 15, marginTop: -30, ...Shadows.md },
  progressSectionDark: { backgroundColor: Colors.dark.surface },
  progressLabel: { fontWeight: 'bold', marginBottom: 10, color: Colors.light.text },
  progressBarBg: { height: 10, backgroundColor: Colors.grey[200], borderRadius: 5, overflow: 'hidden' },
  progressBarBgDark: { backgroundColor: Colors.grey[800] },
  progressBarFill: { height: '100%', backgroundColor: Colors.brand.primary },
  progressSub: { fontSize: 11, color: Colors.light.textSecondary, marginTop: 8, textAlign: 'right' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 25 },
  statItem: { alignItems: 'center', flex: 1 },
  statNum: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  statLabel: { fontSize: 12, color: Colors.light.textSecondary },
  statDivider: { width: 1, height: '100%', backgroundColor: Colors.grey[200] },
  statDividerDark: { backgroundColor: Colors.grey[700] },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text, marginBottom: 15 },
  benefitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.base.white, padding: 15, borderRadius: 12, marginBottom: 10, gap: 15, ...Shadows.sm },
  benefitCardDark: { backgroundColor: Colors.dark.surface },
  benefitLocked: { opacity: 0.7, backgroundColor: Colors.grey[100] },
  benefitIcon: { width: 45, height: 45, borderRadius: 22.5, alignItems: 'center', justifyContent: 'center' },
  benefitTitle: { fontWeight: 'bold', fontSize: 14, color: Colors.light.text },
  benefitDesc: { fontSize: 12, color: Colors.light.textSecondary, marginTop: 2 },
});