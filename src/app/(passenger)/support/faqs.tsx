// src/app/(passenger)/support/faqs.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';
import { Image } from 'expo-image';
import Collapsible from 'react-native-collapsible';

interface FAQ {
  id: string;
  category: 'trips' | 'general';
  icon: string;
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  // VIAJES
  {
    id: '1',
    category: 'trips',
    icon: 'help-circle-outline',
    question: 'El conductor no llegó',
    answer: 'Si el conductor no llega en el tiempo estimado, puedes cancelar el viaje sin cargo. También puedes contactar con soporte para reportar el incidente.',
  },
  {
    id: '2',
    category: 'trips',
    icon: 'help-circle-outline',
    question: 'El precio no es el mostrado',
    answer: 'El precio puede variar según la demanda, tráfico y tiempo de espera. Puedes ver el desglose completo en el recibo del viaje.',
  },
  {
    id: '3',
    category: 'trips',
    icon: 'help-circle-outline',
    question: 'La ruta no era la mejor',
    answer: 'Nuestro sistema calcula la ruta más eficiente considerando tráfico en tiempo real. Si deseas una ruta específica, puedes indicárselo al conductor.',
  },
  // GENERALES
  {
    id: '4',
    category: 'general',
    icon: 'help-circle-outline',
    question: 'El viaje fue cancelado',
    answer: 'Los viajes pueden cancelarse por diversas razones. Revisa tu historial para ver el motivo específico o contacta a soporte.',
  },
  {
    id: '5',
    category: 'general',
    icon: 'help-circle-outline',
    question: 'El conductor tomó otra ruta',
    answer: 'Los conductores pueden elegir rutas alternativas para evitar tráfico. Si crees que fue intencional, repórtalo en tu historial.',
  },
  {
    id: '6',
    category: 'general',
    icon: 'help-circle-outline',
    question: 'El conductor tomó otra ruta',
    answer: 'Los conductores están capacitados para ofrecer el mejor servicio. Si tuviste algún problema, califícalo y describe la situación.',
  },
];

export default function SupportFAQsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = FAQS.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tripFAQs = filteredFAQs.filter((f) => f.category === 'trips');
  const generalFAQs = filteredFAQs.filter((f) => f.category === 'general');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderFAQ = (faq: FAQ) => {
    const isExpanded = expandedId === faq.id;

    return (
      <View key={faq.id} style={styles.faqItem}>
        <TouchableOpacity
          style={styles.faqHeader}
          onPress={() => toggleExpand(faq.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={faq.icon as any}
            size={20}
            color={Colors.brand.primary}
            style={styles.faqIcon}
          />
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Colors.grey[600]}
          />
        </TouchableOpacity>

        <Collapsible collapsed={!isExpanded}>
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{faq.answer}</Text>
          </View>
        </Collapsible>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="menu" size={28} color={Colors.base.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Soporte y Ayuda</Text>
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

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.grey[600]} />
          <TextInput
            style={styles.searchInput}
            placeholder="¿Cómo podemos ayudarte?"
            placeholderTextColor={Colors.grey[500]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FAQs - Viajes */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.categoryHeader}>
            <MaterialCommunityIcons name="car" size={20} color={Colors.light.text} />
            <Text style={styles.categoryTitle}>Viajes</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.grey[500]} />
          </TouchableOpacity>

          {tripFAQs.map(renderFAQ)}
        </View>

        {/* FAQs - Generales */}
        <View style={styles.section}>
          {generalFAQs.map(renderFAQ)}
        </View>

        {/* Contact Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => router.push('/(passenger)/support')}
        >
          <Ionicons name="call" size={20} color={Colors.base.white} />
          <Text style={styles.contactText}>Contáctanos</Text>
        </TouchableOpacity>

        {/* Footer Logo */}
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
    backgroundColor: Colors.brand.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  backButton: {
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
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
    fontSize: Typography.size.base,
    color: Colors.light.text,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey[100],
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    paddingVertical: Spacing.xs,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  categoryTitle: {
    flex: 1,
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
  },
  faqItem: {
    backgroundColor: Colors.base.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  faqIcon: {
    marginRight: Spacing.sm,
  },
  faqQuestion: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    lineHeight: Typography.size.sm * 1.4,
  },
  faqAnswer: {
    paddingLeft: Spacing.xl + Spacing.sm,
    paddingRight: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  faqAnswerText: {
    fontSize: Typography.size.sm,
    color: Colors.grey[700],
    lineHeight: Typography.size.sm * 1.5,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brand.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
    ...Shadows.md,
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