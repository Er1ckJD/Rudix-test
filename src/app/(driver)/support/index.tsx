// src/app/(driver)/support/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
} from '@/constants/theme';
import ListItem from '@/components/ui/ListItem';

const FAQ_ITEMS = [
  'No recibí el pago de mi viaje',
  '¿Cómo cambio mi cuenta bancaria?',
  'El pasajero ensució mi vehículo',
  'Revisión de documentos pendientes',
  'Entender mi nivel de Fidelity',
];

export default function SupportScreen() {
  const router = useRouter();

  const renderChevron = () => (
    <Ionicons name="chevron-forward" size={20} color={Colors.grey[400]} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Centro de Ayuda',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.light.surface },
          headerTintColor: Colors.light.text,
          headerTitleStyle: {
            fontSize: Typography.size.lg,
            fontWeight: Typography.weight.semibold,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors.light.text}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={Colors.grey[600]}
            style={{ marginRight: Spacing.sm }}
          />
          <TextInput
            placeholder="¿Cómo podemos ayudarte?"
            style={styles.searchInput}
          />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Contacto Directo</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: Colors.social.whatsapp + '20' },
              ]}
            >
              <Ionicons
                name="chatbubbles-outline"
                size={24}
                color={Colors.social.whatsapp}
              />
            </View>
            <Text style={styles.contactLabel}>Chat en Vivo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: Colors.semantic.error + '20' },
              ]}
            >
              <Ionicons
                name="call-outline"
                size={24}
                color={Colors.semantic.error}
              />
            </View>
            <Text style={styles.contactLabel}>Línea de Emergencia</Text>
          </TouchableOpacity>
        </View>

        {/* Last Trip */}
        <View style={styles.tripCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.tripTitle}>Problema con último viaje</Text>
            <Text style={styles.tripDate}>Hoy, 10:30 AM</Text>
          </View>
          <Text style={styles.tripRoute}>
            Centro Histórico → Plaza Las Américas
          </Text>
          <TouchableOpacity style={styles.reportBtn}>
            <Text style={styles.reportText}>Reportar problema</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
        <View style={styles.card}>
          {FAQ_ITEMS.map((item, index) => (
            <ListItem
              key={item}
              isFirst={index === 0}
              isLast={index === FAQ_ITEMS.length - 1}
              icon="help-circle-outline"
              title={item}
              onPress={() => {
                /* Navigate to FAQ details */
              }}
              rightElement={renderChevron()}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.surface },
  scroll: { padding: Spacing.lg },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.base.white,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.base,
    paddingVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginVertical: Spacing.lg,
  },
  contactRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  contactCard: {
    flex: 1,
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  contactLabel: {
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    fontSize: Typography.size.sm,
  },
  tripCard: {
    backgroundColor: Colors.base.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.brand.primary,
    ...Shadows.sm,
  },
  tripTitle: {
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    fontSize: Typography.size.base,
  },
  tripDate: {
    fontSize: Typography.size.sm,
    color: Colors.light.textSecondary,
  },
  tripRoute: {
    color: Colors.light.textSecondary,
    marginVertical: Spacing.sm,
    fontSize: Typography.size.sm,
  },
  reportBtn: {
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  reportText: {
    color: Colors.brand.primary,
    fontWeight: Typography.weight.bold,
    fontSize: Typography.size.sm,
  },
  card: {
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
});