import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { Image } from 'expo-image';

const SUPPORT_CATEGORIES = [
  {
    id: 'trips',
    title: 'Viajes',
    icon: 'car',
    description: 'Ayuda con solicitudes y viajes',
  },
  {
    id: 'payments',
    title: 'Pagos y cobros',
    icon: 'cash',
    description: 'Métodos de pago y facturación',
  },
  {
    id: 'safety',
    title: 'Seguridad',
    icon: 'shield-checkmark',
    description: 'Reportes y emergencias',
  },
  {
    id: 'account',
    title: 'Cuenta y app',
    icon: 'person-circle',
    description: 'Configuración y perfil',
  },
  {
    id: 'legal',
    title: 'Información legal',
    icon: 'document-text',
    description: 'Términos y políticas',
  },
  {
    id: 'messages',
    title: 'Historial de mensajes',
    icon: 'chatbubbles',
    description: 'Ver conversaciones anteriores',
  },
];

export default function ImprovedSupportScreen() {
  const router = useRouter();

  const handleContact = () => {
    // router.push('/(passenger)/support/chat');
    Linking.openURL('mailto:soporte@rudix.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="menu" size={28} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Soporte y Ayuda</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.heroImage}
            contentFit="contain"
          />
          <Text style={styles.heroTitle}>No estás solo, estamos contigo</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.grey[600]} />
          <Text style={styles.searchPlaceholder}>¿Cómo podemos ayudarte?</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          {SUPPORT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => console.log(`Navigate to ${category.id}`)}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon as any} size={24} color={Colors.brand.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDesc}>{category.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Button */}
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <View style={styles.contactIcon}>
            <MaterialCommunityIcons name="headset" size={24} color={Colors.base.white} />
          </View>
          <Text style={styles.contactText}>Contáctanos</Text>
        </TouchableOpacity>

        {/* Logo Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>RuDix</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  heroImage: {
    width: 120,
    height: 120,
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey[100],
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.size.base,
    color: Colors.grey[600],
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.grey[200],
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.brand.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  categoryTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginBottom: 2,
  },
  categoryDesc: {
    fontSize: Typography.size.sm,
    color: Colors.light.textSecondary,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brand.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    ...Shadows.md,
  },
  contactIcon: {
    marginRight: Spacing.md,
  },
  contactText: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  footerLogo: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.black,
    color: Colors.light.text,
    letterSpacing: 1,
  },
});