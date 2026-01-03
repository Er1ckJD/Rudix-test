import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';

type FidelityLevel = 'base' | 'plus' | 'premium';
type ModalContent =
  | 'accumulation'
  | 'priority'
  | 'levels'
  | 'rewards'
  | 'experience'
  | 'community'
  | 'redeem'
  | 'earn'
  | null;

const FIDELITY_LEVELS = [
  {
    id: 'base',
    name: 'Fidelity Base',
    color: '#4CAF50',
    points: '1x puntos',
    description: 'Disfruta de las ventajas básicas de RuDix',
  },
  {
    id: 'plus',
    name: 'Fidelity Plus',
    color: '#2196F3',
    points: '1.5x puntos',
    description: 'Desbloquea recompensas mejoradas y más viajes',
    current: true,
  },
  {
    id: 'premium',
    name: 'Fidelity Premium',
    color: '#9C27B0',
    points: '2x puntos',
    description: 'Viaja con ventajas premium y beneficios exclusivos',
  },
];

const BENEFITS = [
  {
    id: 'accumulation',
    icon: 'flash',
    title: 'Acumulación de puntos',
    subtitle: 'Por uso responsable',
    color: '#FBC02D',
    bg: '#FFF9C4',
  },
  {
    id: 'priority',
    icon: 'speedometer',
    title: 'Prioridad operativa',
    subtitle: 'Viaja más rápido',
    color: '#FF6F00',
    bg: '#FFE0B2',
  },
  {
    id: 'levels',
    icon: 'trending-up',
    title: 'Niveles de fidelidad',
    subtitle: 'Sube y desbloquea más',
    color: '#5E35B1',
    bg: '#E1BEE7',
  },
  {
    id: 'rewards',
    icon: 'gift',
    title: 'Recompensas y descuentos',
    subtitle: 'Canjea tus puntos',
    color: '#EC407A',
    bg: '#F8BBD0',
  },
  {
    id: 'experience',
    icon: 'star',
    title: 'Experiencia personalizada',
    subtitle: 'La app aprende de ti',
    color: '#1E88E5',
    bg: '#BBDEFB',
  },
  {
    id: 'community',
    icon: 'heart',
    title: 'Recompensas por comunidad',
    subtitle: 'Comparte y gana',
    color: '#E53935',
    bg: '#FFCDD2',
  },
];

const REWARD_ITEMS = [
  { id: '1', icon: 'car', title: 'Viaje gratis', subtitle: 'Viaje completo', points: 500, discount: '100% OFF' },
  { id: '2', icon: 'percent', title: '30% descuento', subtitle: 'Próximo viaje', points: 200, discount: '30% OFF' },
  { id: '3', icon: 'cash', title: '50% descuento', subtitle: 'Cualquier viaje', points: 350, discount: '50% OFF' },
  { id: '4', icon: 'flash', title: 'Prioridad 24h', subtitle: 'Todo el día', points: 150, discount: '1 día' },
  { id: '5', icon: 'trophy', title: 'Upgrade a Premium', subtitle: 'Por 1 mes', points: 1000, discount: '1 mes' },
  { id: '6', icon: 'gift', title: '20% descuento', subtitle: 'Próximos 3 viajes', points: 100, discount: '20% OFF' },
];

export default function PassengerFidelityScreen() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ModalContent>(null);
  const [showRewards, setShowRewards] = useState(false);

  const currentPoints = 4200;
  const pointsToNextLevel = 800;
  const currentLevel = FIDELITY_LEVELS.find((l) => l.current);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#108A33', '#15B545']} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="menu" size={28} color={Colors.base.white} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <MaterialCommunityIcons
              name="account-circle"
              size={64}
              color={Colors.base.white}
            />
            <Text style={styles.headerTitle}>RuDix Fidelity</Text>
            <Text style={styles.headerSubtitle}>
              Programa de fidelidad y recompensas para pasajeros
            </Text>
          </View>
        </LinearGradient>

        {/* Current Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelBadge}>
              <MaterialCommunityIcons name="shield-star" size={24} color={currentLevel?.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.levelTitle}>Tu nivel actual</Text>
              <Text style={[styles.levelName, { color: currentLevel?.color }]}>
                {currentLevel?.name}
              </Text>
              <Text style={styles.levelPoints}>Multiplica cada 1.5x</Text>
            </View>
            <TouchableOpacity onPress={() => setActiveModal('levels')}>
              <Ionicons name="information-circle" size={24} color={Colors.brand.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowRewards(true)} style={styles.giftButton}>
              <MaterialCommunityIcons name="gift" size={24} color={Colors.brand.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.pointsContainer}>
            <Text style={styles.pointsNumber}>{currentPoints.toLocaleString()}</Text>
            <Text style={styles.pointsLabel}>Punto disponibles</Text>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Próximo nivel: Fidelity Premium</Text>
              <Text style={styles.progressPoints}>
                {pointsToNextLevel} pts para subir
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '70%' }]} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>87</Text>
              <Text style={styles.statLabel}>Viajes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$1250</Text>
              <Text style={styles.statLabel}>Ahorrado</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Calificación</Text>
            </View>
          </View>
        </View>

        {/* Niveles de Fidelidad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Niveles Fidelity</Text>
          {FIDELITY_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelOption,
                level.current && styles.levelOptionActive,
              ]}
              onPress={() => setActiveModal('levels')}
            >
              <View
                style={[
                  styles.levelIndicator,
                  { backgroundColor: level.color + '30' },
                ]}
              >
                <MaterialCommunityIcons
                  name={level.current ? 'shield-star' : 'shield-outline'}
                  size={28}
                  color={level.color}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.levelOptionName}>{level.name}</Text>
                <Text style={styles.levelOptionDesc}>{level.description}</Text>
              </View>
              <Text style={[styles.levelPoints, { color: level.color }]}>
                {level.points}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tus Beneficios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus beneficios</Text>
          <View style={styles.benefitsGrid}>
            {BENEFITS.map((benefit) => (
              <TouchableOpacity
                key={benefit.id}
                style={styles.benefitCard}
                onPress={() => setActiveModal(benefit.id as ModalContent)}
              >
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: benefit.bg },
                  ]}
                >
                  <Ionicons name={benefit.icon as any} size={24} color={benefit.color} />
                </View>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitSubtitle}>{benefit.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Invite Friends */}
        <TouchableOpacity style={styles.inviteCard}>
          <View style={styles.inviteIcon}>
            <MaterialCommunityIcons name="account-multiple-plus" size={32} color={Colors.brand.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteTitle}>Invitar amigos</Text>
            <Text style={styles.inviteSubtitle}>Gana puntos Fidelity</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.grey[400]} />
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <BenefitModal
        visible={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />

      <RedeemPointsModal
        visible={showRewards}
        points={currentPoints}
        rewards={REWARD_ITEMS}
        onClose={() => setShowRewards(false)}
      />
    </SafeAreaView>
  );
}

// Modal de Beneficios
function BenefitModal({ visible, type, onClose }: any) {
  const content = {
    accumulation: {
      icon: 'flash',
      color: '#FBC02D',
      title: 'Acumulación de puntos',
      items: [
        'Puntos por viajes completados',
        'Bonos por buena calificación',
        'Puntos extra por puntualidad',
        'Bonificación por uso constante',
      ],
      tip: 'Consejo: Usa RuDix de forma responsable y multiplica tus puntos',
    },
    priority: {
      icon: 'speedometer',
      color: '#FF6F00',
      title: 'Prioridad operativa',
      items: [
        'Menor tiempo de espera',
        'Prioridad en asignación en horas pico',
        'Acceso a conductores mejor calificados',
        'Algoritmo de preferencia activado',
      ],
      tip: 'Consejo: Tu nivel Fidelity te da ventaja en la asignación',
    },
    levels: {
      icon: 'trending-up',
      color: '#5E35B1',
      title: 'Niveles de fidelidad',
      items: [
        'Base (1x puntos)',
        'Plus (1.5x puntos)',
        'Premium (2x puntos)',
        'Cada nivel desbloquea más beneficios',
      ],
      tip: 'Consejo: Mientras más alto tu nivel, más rápido acumulas',
    },
    rewards: {
      icon: 'gift',
      color: '#EC407A',
      title: 'Recompensas y descuentos',
      items: [
        'Descuentos directos en viajes',
        'Viajes parcialmente gratis',
        'Promociones exclusivas',
        'Ofertas en fechas especiales',
      ],
      tip: 'Consejo: Ahorra en cada viaje con tus puntos acumulados',
    },
    experience: {
      icon: 'star',
      color: '#1E88E5',
      title: 'Experiencia personalizada',
      items: [
        'Rutas frecuentes sugeridas automáticamente',
        'Horarios comunes guardados',
        'Solicitud de viaje más rápida',
        'Recomendaciones inteligentes',
      ],
      tip: 'Consejo: Menos clic, más rápidos en tus viajes habituales',
    },
    community: {
      icon: 'heart',
      color: '#E53935',
      title: 'Recompensas por comunidad',
      items: [
        'Puntos por recomendar RuDix',
        'Beneficios por buen comportamiento',
        'Incentivos por uso responsable',
        'Construye una comunidad mejor',
      ],
      tip: 'Consejo: Invita amigos y ambos ganan puntos',
    },
  };

  if (!type || !content[type as keyof typeof content]) return null;

  const modal = content[type as keyof typeof content];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <View style={[styles.modalIcon, { backgroundColor: modal.color + '20' }]}>
            <Ionicons name={modal.icon as any} size={32} color={modal.color} />
          </View>
          <Text style={styles.modalTitle}>{modal.title}</Text>

          <View style={styles.modalList}>
            {modal.items.map((item, index) => (
              <View key={index} style={styles.modalItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.brand.primary}
                  style={{ marginRight: Spacing.sm }}
                />
                <Text style={styles.modalItemText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.modalTip, { backgroundColor: modal.color + '15' }]}>
            <Ionicons name="bulb" size={20} color={modal.color} />
            <Text style={[styles.modalTipText, { color: modal.color }]}>
              {modal.tip}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: modal.color }]}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Modal de Canjear Puntos
function RedeemPointsModal({ visible, points, rewards, onClose }: any) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.redeemModal}>
          <View style={styles.modalHandle} />
          <View style={styles.redeemHeader}>
            <Text style={styles.redeemTitle}>Canjea puntos</Text>
            <Text style={styles.redeemPoints}>Tienes {points.toLocaleString()} puntos</Text>
          </View>

          <ScrollView style={styles.rewardsList}>
            {rewards.map((reward: any) => (
              <View key={reward.id} style={styles.rewardItem}>
                <View style={styles.rewardIcon}>
                  <MaterialCommunityIcons name={reward.icon} size={28} color={Colors.brand.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardSubtitle}>{reward.subtitle}</Text>
                  <Text style={styles.rewardDiscount}>{reward.discount}</Text>
                </View>
                <View style={styles.rewardAction}>
                  <Text style={styles.rewardPoints}>{reward.points} pts</Text>
                  <TouchableOpacity
                    style={[
                      styles.rewardButton,
                      points < reward.points && styles.rewardButtonDisabled,
                    ]}
                    disabled={points < reward.points}
                  >
                    <Text
                      style={[
                        styles.rewardButtonText,
                        points < reward.points && styles.rewardButtonTextDisabled,
                      ]}
                    >
                      Canjear
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Estilos (continuación...)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingTop: Spacing.xl, paddingBottom: Spacing.xxl, paddingHorizontal: Spacing.lg },
  backButton: { marginBottom: Spacing.lg },
  headerContent: { alignItems: 'center' },
  headerTitle: { fontSize: Typography.size.xxl, fontWeight: Typography.weight.bold, color: Colors.base.white, marginTop: Spacing.sm },
  headerSubtitle: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: Spacing.xs },
  levelCard: { backgroundColor: Colors.base.white, marginHorizontal: Spacing.lg, marginTop: -Spacing.xl, borderRadius: BorderRadius.xl, padding: Spacing.lg, ...Shadows.lg },
  levelHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  levelBadge: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  levelTitle: { fontSize: Typography.size.sm, color: Colors.grey[600] },
  levelName: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold },
  levelPoints: { fontSize: Typography.size.xs, color: Colors.grey[600], marginTop: 2 },
  giftButton: { marginLeft: Spacing.sm },
  pointsContainer: { alignItems: 'center', marginBottom: Spacing.lg },
  pointsNumber: { fontSize: 48, fontWeight: Typography.weight.black, color: Colors.brand.primary },
  pointsLabel: { fontSize: Typography.size.sm, color: Colors.grey[600] },
  progressSection: { marginBottom: Spacing.md },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.xs },
  progressLabel: { fontSize: Typography.size.sm, fontWeight: Typography.weight.medium },
  progressPoints: { fontSize: Typography.size.sm, color: Colors.grey[600] },
  progressBar: { height: 8, backgroundColor: Colors.grey[200], borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.brand.primary },
  statsRow: { flexDirection: 'row', paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.grey[200] },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold },
  statLabel: { fontSize: Typography.size.xs, color: Colors.grey[600], marginTop: 2 },
  statDivider: { width: 1, backgroundColor: Colors.grey[200] },
  section: { paddingHorizontal: Spacing.lg, marginTop: Spacing.xl },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, marginBottom: Spacing.md },
  levelOption: { backgroundColor: Colors.base.white, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center' },
  levelOptionActive: { borderWidth: 2, borderColor: Colors.brand.primary },
  levelIndicator: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  levelOptionName: { fontSize: Typography.size.base, fontWeight: Typography.weight.bold },
  levelOptionDesc: { fontSize: Typography.size.sm, color: Colors.grey[600] },
  benefitsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  benefitCard: { width: '48.5%', backgroundColor: Colors.base.white, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center' },
  benefitIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  benefitTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, textAlign: 'center' },
  benefitSubtitle: { fontSize: Typography.size.xs, color: Colors.grey[600], textAlign: 'center', marginTop: 2 },
  inviteCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.base.white, marginHorizontal: Spacing.lg, marginVertical: Spacing.xl, padding: Spacing.lg, borderRadius: BorderRadius.md },
  inviteIcon: { marginRight: Spacing.md },
  inviteTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.bold },
  inviteSubtitle: { fontSize: Typography.size.sm, color: Colors.grey[600] },
  
  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: Colors.base.white, borderTopLeftRadius: BorderRadius.xxl, borderTopRightRadius: BorderRadius.xxl, padding: Spacing.xl, maxHeight: '80%' },
  modalHandle: { width: 40, height: 4, backgroundColor: Colors.grey[300], borderRadius: 2, alignSelf: 'center', marginBottom: Spacing.lg },
  modalIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: Spacing.md },
  modalTitle: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, textAlign: 'center', marginBottom: Spacing.lg },
  modalList: { marginBottom: Spacing.lg },
  modalItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
  modalItemText: { flex: 1, fontSize: Typography.size.base, lineHeight: Typography.size.base * 1.5 },
  modalTip: { flexDirection: 'row', padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.lg, alignItems: 'center' },
  modalTipText: { flex: 1, fontSize: Typography.size.sm, marginLeft: Spacing.sm, fontWeight: Typography.weight.medium },
  modalButton: { padding: Spacing.md, borderRadius: BorderRadius.xl, alignItems: 'center' },
  modalButtonText: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.base.white },

  // Redeem Modal
  redeemModal: { backgroundColor: Colors.base.white, borderTopLeftRadius: BorderRadius.xxl, borderTopRightRadius: BorderRadius.xxl, padding: Spacing.xl, maxHeight: '85%' },
  redeemHeader: { alignItems: 'center', marginBottom: Spacing.lg },
  redeemTitle: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold },
  redeemPoints: { fontSize: Typography.size.base, color: Colors.brand.primary, fontWeight: Typography.weight.semibold, marginTop: Spacing.xs },
  rewardsList: { maxHeight: 400 },
  rewardItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  rewardIcon: { marginRight: Spacing.md },
  rewardTitle: { fontSize: Typography.size.base, fontWeight: Typography.weight.bold },
  rewardSubtitle: { fontSize: Typography.size.sm, color: Colors.grey[600] },
  rewardDiscount: { fontSize: Typography.size.xs, color: Colors.brand.primary, fontWeight: Typography.weight.bold, marginTop: 2 },
  rewardAction: { alignItems: 'flex-end' },
  rewardPoints: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, marginBottom: Spacing.xs },
  rewardButton: { backgroundColor: Colors.brand.primary, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.md },
  rewardButtonDisabled: { backgroundColor: Colors.grey[300] },
  rewardButtonText: { color: Colors.base.white, fontWeight: Typography.weight.bold, fontSize: Typography.size.sm },
  rewardButtonTextDisabled: { color: Colors.grey[500] },
  closeButton: { marginTop: Spacing.lg, padding: Spacing.md, alignItems: 'center' },
  closeButtonText: { fontSize: Typography.size.base, color: Colors.grey[600] },
});