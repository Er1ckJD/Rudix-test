// src/app/(passenger)/fidelity/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Imports de tus componentes
import { Colors, Spacing, CommonStyles, Typography } from '@/constants/theme';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock Data
const PASSENGER_FIDELITY = {
  currentPoints: 850,
  pointsToNextReward: 1000,
  history: [
    { id: 1, title: 'Viaje finalizado', points: '+50', date: 'Hoy, 10:30 AM' },
    { id: 2, title: 'Viaje finalizado', points: '+35', date: 'Ayer, 08:15 PM' },
    { id: 3, title: 'Bono de bienvenida', points: '+200', date: 'Hace 1 semana' },
  ]
};

export default function PassengerFidelityScreen() {
  const navigation = useNavigation();
  const progress = (PASSENGER_FIDELITY.currentPoints / PASSENGER_FIDELITY.pointsToNextReward) * 100;

  return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header Personalizado */}
        <View style={styles.header}>
          <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={styles.menuButton}
          >
            <Ionicons name="menu" size={28} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Nivel Fidelity</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="information-circle-outline" size={24} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

          {/* Tarjeta Principal de Puntos */}
          <Card variant="elevated" style={styles.mainCard}>
            <LinearGradientBackground>
              <View style={styles.pointsContainer}>
                <Ionicons name="diamond" size={40} color={Colors.base.white} />
                <View style={{ marginLeft: Spacing.md }}>
                  <Text style={styles.pointsLabel}>Mis Puntos RuDix</Text>
                  <Text style={styles.pointsValue}>{PASSENGER_FIDELITY.currentPoints}</Text>
                </View>
              </View>

              <View style={styles.rewardProgress}>
                <Text style={styles.rewardText}>
                  Faltan {PASSENGER_FIDELITY.pointsToNextReward - PASSENGER_FIDELITY.currentPoints} puntos para un viaje gratis
                </Text>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
              </View>
            </LinearGradientBackground>
          </Card>

          {/* Acciones Rápidas */}
          <View style={styles.actionsRow}>
            <Button
                title="Canjear Puntos"
                variant="primary"
                size="sm"
                style={{ flex: 1, marginRight: Spacing.xs }}
            />
            <Button
                title="Cómo ganar"
                variant="secondary"
                size="sm"
                style={{ flex: 1, marginLeft: Spacing.xs }}
            />
          </View>

          {/* Historial */}
          <Text style={styles.sectionTitle}>Historial de Puntos</Text>
          <Card variant="flat">
            {PASSENGER_FIDELITY.history.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && <Card.Divider />}
                  <View style={styles.historyItem}>
                    <View style={styles.historyIcon}>
                      <Ionicons name="car-outline" size={20} color={Colors.brand.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyTitle}>{item.title}</Text>
                      <Text style={styles.historyDate}>{item.date}</Text>
                    </View>
                    <Text style={styles.historyPoints}>{item.points}</Text>
                  </View>
                </React.Fragment>
            ))}
          </Card>

        </ScrollView>
      </SafeAreaView>
  );
}

// Componente simulado para el fondo gradiente (si no tienes LinearGradient instalado en este archivo, usa View con color sólido)
function LinearGradientBackground({ children }: { children: React.ReactNode }) {
  return (
      <View style={{ backgroundColor: Colors.brand.primary, padding: Spacing.lg }}>
        {children}
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.surface },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
  },
  menuButton: { padding: Spacing.xs },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  content: { padding: Spacing.md },

  mainCard: { overflow: 'hidden', marginBottom: Spacing.lg, borderRadius: 16 },
  pointsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg },
  pointsLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  pointsValue: { color: 'white', fontSize: 32, fontWeight: 'bold' },

  rewardProgress: {},
  rewardText: { color: 'white', fontSize: 12, marginBottom: Spacing.xs },
  progressBarBg: { height: 6, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
  progressBarFill: { height: '100%', backgroundColor: Colors.brand.secondary, borderRadius: 3 },

  actionsRow: { flexDirection: 'row', marginBottom: Spacing.xl },

  sectionTitle: { ...CommonStyles.h3, marginBottom: Spacing.md },

  historyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.xs },
  historyIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.grey[100],
    justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md
  },
  historyTitle: { ...CommonStyles.body, fontWeight: '500' },
  historyDate: { ...CommonStyles.caption },
  historyPoints: { fontWeight: 'bold', color: Colors.brand.primary },
});
