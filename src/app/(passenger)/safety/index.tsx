import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { useDrawer } from '@/hooks/useDrawer';
import { LinearGradient } from 'expo-linear-gradient';
import SafetyModal from '@/components/safety/SafetyModal';

type ModalType = 'before-ride' | 'during-ride' | 'emergency' | 'end-ride' | 'accident' | null;

export default function ImprovedSecurityScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleCall911 = () => {
    // Linking.openURL('tel:911');
    alert('Llamando al 911...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Seguridad</Text>
            <Text style={styles.heroSubtitle}>
              La seguridad es un derecho, no un privilegio. RuDix te cuida.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={openDrawer}
          >
            <Ionicons name="menu" size={28} color={Colors.base.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Funciones de Seguridad */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Funciones de Seguridad</Text>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push('/(passenger)/safety/contacts')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialCommunityIcons
                  name="account-multiple-check-outline"
                  size={26}
                  color="#1976D2"
                />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Contacto de emergencia</Text>
                <Text style={styles.featureSubtitle}>
                  Comparte el estado del viaje automáticamente
                </Text>
              </View>
              <MaterialCommunityIcons name="plus" size={24} color={Colors.brand.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => router.push('/(passenger)/support')}
            >
              <View style={[styles.featureIcon, { backgroundColor: '#F3E5F5' }]}>
                <MaterialCommunityIcons
                  name="headset"
                  size={26}
                  color="#9C27B0"
                />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Soporte</Text>
                <Text style={styles.featureSubtitle}>
                  Chat y ayuda en tiempo real
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={Colors.grey[400]} />
            </TouchableOpacity>
          </View>

          {/* Botón 911 Destacado */}
          <TouchableOpacity style={styles.emergencyButton} onPress={handleCall911}>
            <View style={styles.emergencyIcon}>
              <MaterialCommunityIcons
                name="police-badge-outline"
                size={28}
                color={Colors.base.white}
              />
            </View>
            <Text style={styles.emergencyText}>Llamar 911</Text>
          </TouchableOpacity>

          {/* Cómo estás protegido */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cómo estás protegido con RuDix</Text>

            <View style={styles.protectionGrid}>
              <TouchableOpacity
                style={styles.protectionCard}
                onPress={() => setActiveModal('before-ride')}
              >
                <View style={[styles.protectionIcon, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialCommunityIcons name="eye" size={24} color="#1976D2" />
                </View>
                <Text style={styles.protectionText}>Antes de subir al vehículo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.protectionCard}
                onPress={() => setActiveModal('during-ride')}
              >
                <View style={[styles.protectionIcon, { backgroundColor: '#E8F5E9' }]}>
                  <MaterialCommunityIcons
                    name="map-marker-check"
                    size={24}
                    color={Colors.brand.primary}
                  />
                </View>
                <Text style={styles.protectionText}>Durante el viaje</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.protectionCard}
                onPress={() => setActiveModal('emergency')}
              >
                <View style={[styles.protectionIcon, { backgroundColor: '#FFEBEE' }]}>
                  <MaterialCommunityIcons name="alert" size={24} color="#E53935" />
                </View>
                <Text style={styles.protectionText}>En situaciones de riesgo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.protectionCard}
                onPress={() => setActiveModal('end-ride')}
              >
                <View style={[styles.protectionIcon, { backgroundColor: '#F3E5F5' }]}>
                  <MaterialCommunityIcons name="star" size={24} color="#9C27B0" />
                </View>
                <Text style={styles.protectionText}>Al finalizar el viaje</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.protectionCard}
                onPress={() => setActiveModal('accident')}
              >
                <View style={[styles.protectionIcon, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialCommunityIcons name="bell" size={24} color="#FF9800" />
                </View>
                <Text style={styles.protectionText}>Accidentes: pasos a seguir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      {activeModal && (
        <SafetyModal
          visible={activeModal !== null}
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.white,
  },
  hero: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  heroTitle: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.base.white,
    lineHeight: Typography.size.base * 1.5,
  },
  menuButton: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    padding: Spacing.sm,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.light.textSecondary,
  },
  emergencyButton: {
    backgroundColor: Colors.semantic.error,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  emergencyIcon: {
    marginRight: Spacing.md,
  },
  emergencyText: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
  protectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  protectionCard: {
    width: '48%',
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  protectionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  protectionText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.light.text,
    textAlign: 'center',
  },
});