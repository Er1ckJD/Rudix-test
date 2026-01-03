import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import { useDrawer } from '@/hooks/useDrawer';
import { Image } from 'expo-image';
import ListItem from '@/components/ui/ListItem'; // Import the new component

const SUPPORT_CATEGORIES = [
  {
    id: 'trips',
    title: 'Viajes',
    icon: 'car-outline',
    description: 'Ayuda con solicitudes y viajes',
  },
  {
    id: 'payments',
    title: 'Pagos y cobros',
    icon: 'cash-outline',
    description: 'Métodos de pago y facturación',
  },
  {
    id: 'safety',
    title: 'Seguridad',
    icon: 'shield-checkmark-outline',
    description: 'Reportes y emergencias',
  },
  {
    id: 'account',
    title: 'Cuenta y app',
    icon: 'person-circle-outline',
    description: 'Configuración y perfil',
  },
  {
    id: 'legal',
    title: 'Información legal',
    icon: 'document-text-outline',
    description: 'Términos y políticas',
  },
  {
    id: 'messages',
    title: 'Historial de mensajes',
    icon: 'chatbubbles-outline',
    description: 'Ver conversaciones anteriores',
  },
];

export default function ImprovedSupportScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawer();

  const handleContact = () => {
    // router.push('/(passenger)/support/chat');
    Linking.openURL('mailto:soporte@rudix.com');
  };

  const renderChevron = () => (
    <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer} style={styles.backButton}>
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
        <TouchableOpacity style={styles.searchContainer} activeOpacity={0.8}>
          <Ionicons name="search" size={20} color={Colors.grey[600]} />
          <Text style={styles.searchPlaceholder}>¿Cómo podemos ayudarte?</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.card}>
            {SUPPORT_CATEGORIES.map((category, index) => (
              <ListItem
                key={category.id}
                isFirst={index === 0}
                isLast={index === SUPPORT_CATEGORIES.length - 1}
                icon={category.icon as keyof typeof Ionicons.glyphMap}
                title={category.title}
                subtitle={category.description}
                onPress={() => router.push('/(passenger)/support/faqs')}
                rightElement={renderChevron()}
              />
            ))}
          </View>
        </View>

        {/* Contact Button */}
        <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
          <View style={styles.contactIcon}>
            <MaterialCommunityIcons
              name="headset"
              size={24}
              color={Colors.base.white}
            />
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
    backgroundColor: Colors.light.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.base.white,
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
    backgroundColor: Colors.base.white,
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
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
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
  card: {
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
    overflow: 'hidden',
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