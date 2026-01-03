import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/constants/theme';

type SafetyModalType =
  | 'before-ride'
  | 'during-ride'
  | 'emergency'
  | 'end-ride'
  | 'accident';

interface SafetyModalProps {
  visible: boolean;
  type: SafetyModalType;
  onClose: () => void;
  onAction?: () => void;
}

interface ModalContent {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  items: { icon: string; text: string; color?: string }[];
  highlight?: { icon: string; text: string; color: string; bg: string };
  buttonText: string;
  buttonColor: string;
}

const MODAL_CONTENT: Record<SafetyModalType, ModalContent> = {
  'before-ride': {
    icon: 'eye',
    iconColor: Colors.brand.primary,
    iconBg: '#E8F5E9',
    title: 'Antes de subir al vehículo',
    items: [
      { icon: 'checkmark-circle', text: 'Ver nombre, foto y calificación del conductor' },
      { icon: 'checkmark-circle', text: 'Ver placas, color y modelo del vehículo' },
      { icon: 'checkmark-circle', text: 'Confirmar que todo coincide antes de abordar' },
      { icon: 'checkmark-circle', text: 'Decidir no subir si algo no coincide' },
    ],
    highlight: {
      icon: 'information-circle',
      text: 'Tu seguridad es primero. Si algo no te parece bien, seguro es mejor, elige otra opción y ayudar a mantener a todos seguros. En caso de que no te sientas a la unidad y reportar.',
      color: '#1976D2',
      bg: '#E3F2FD',
    },
    buttonText: 'Entendido',
    buttonColor: '#1976D2',
  },
  'during-ride': {
    icon: 'location',
    iconColor: Colors.brand.primary,
    iconBg: '#E8F5E9',
    title: 'Durante el viaje',
    items: [
      { icon: 'checkmark-circle', text: 'Seguimiento del viaje en tiempo real' },
      { icon: 'checkmark-circle', text: 'Ruta visible durante todo el trayecto' },
      { icon: 'checkmark-circle', text: 'Compartir viaje con contactos de confianza' },
      { icon: 'checkmark-circle', text: 'Botón de emergencia siempre visible' },
      { icon: 'checkmark-circle', text: 'Comunicación sin compartir tu número' },
    ],
    highlight: {
      icon: 'shield-checkmark',
      text: 'No estás solo. RuDix está al pendiente de tu bienestar y seguridad.',
      color: Colors.brand.primary,
      bg: '#E8F5E9',
    },
    buttonText: 'Entendido',
    buttonColor: Colors.brand.primary,
  },
  'emergency': {
    icon: 'warning',
    iconColor: Colors.semantic.error,
    iconBg: '#FFEBEE',
    title: 'En situaciones de riesgo',
    items: [
      { icon: 'checkmark-circle', text: 'Activar ayuda inmediata desde la app' },
      { icon: 'checkmark-circle', text: 'Ubicación compartida automáticamente' },
      { icon: 'checkmark-circle', text: 'Reportar incidentes directamente' },
      { icon: 'checkmark-circle', text: 'Historial del viaje como respaldo' },
    ],
    highlight: {
      icon: 'alert-circle',
      text: 'Hay evidencia y apoyo disponible',
      color: Colors.semantic.error,
      bg: '#FFEBEE',
    },
    buttonText: 'Entendido',
    buttonColor: Colors.semantic.error,
  },
  'end-ride': {
    icon: 'star',
    iconColor: '#9C27B0',
    iconBg: '#F3E5F5',
    title: 'Al finalizar el viaje',
    items: [
      { icon: 'checkmark-circle', text: 'Califica al conductor' },
      { icon: 'checkmark-circle', text: 'Deja comentarios sobre tu experiencia' },
      { icon: 'checkmark-circle', text: 'Reporta comportamientos inseguros' },
      { icon: 'checkmark-circle', text: 'Consulta el viaje en tu historial' },
    ],
    highlight: {
      icon: 'checkmark-done-circle',
      text: 'Tu experiencia tiene consecuencias',
      color: '#9C27B0',
      bg: '#F3E5F5',
    },
    buttonText: 'Entendido',
    buttonColor: '#9C27B0',
  },
  'accident': {
    icon: 'notifications',
    iconColor: '#FF9800',
    iconBg: '#FFF3E0',
    title: 'Accidentes: pasos a seguir',
    items: [
      { icon: 'checkmark-circle', text: 'Mantén la calma y evalúa la situación' },
      { icon: 'checkmark-circle', text: 'Activa el botón de emergencia' },
      { icon: 'checkmark-circle', text: 'Contacta a servicios de emergencia si es necesario, mediante el botón que lo indica' },
      { icon: 'checkmark-circle', text: 'Toma fotos y documenta el incidente' },
      { icon: 'checkmark-circle', text: 'Reporta en la app para seguimiento' },
    ],
    highlight: {
      icon: 'alert-circle',
      text: 'Protocolo de emergencia activo',
      color: '#FF9800',
      bg: '#FFF3E0',
    },
    buttonText: 'Entendido',
    buttonColor: '#FF9800',
  },
};

export default function SafetyModal({
  visible,
  type,
  onClose,
  onAction,
}: SafetyModalProps) {
  const content = MODAL_CONTENT[type];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={20} tint="dark" style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.dragHandle} />

          {/* Header con Icono */}
          <View style={[styles.iconContainer, { backgroundColor: content.iconBg }]}>
            <Ionicons name={content.icon as any} size={32} color={content.iconColor} />
          </View>

          <Text style={styles.title}>{content.title}</Text>

          {/* Lista de Items */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {content.items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={Colors.brand.primary}
                  style={styles.itemIcon}
                />
                <Text style={styles.itemText}>{item.text}</Text>
              </View>
            ))}

            {/* Highlight Box */}
            {content.highlight && (
              <View
                style={[
                  styles.highlightBox,
                  { backgroundColor: content.highlight.bg },
                ]}
              >
                <Ionicons
                  name={content.highlight.icon as any}
                  size={20}
                  color={content.highlight.color}
                  style={styles.highlightIcon}
                />
                <Text
                  style={[styles.highlightText, { color: content.highlight.color }]}
                >
                  {content.highlight.text}
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: content.buttonColor }]}
            onPress={onAction || onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{content.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContainer: {
    backgroundColor: Colors.base.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...Shadows.xl,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.grey[300],
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  scrollContent: {
    maxHeight: 300,
    marginBottom: Spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  itemIcon: {
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  itemText: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    lineHeight: Typography.size.base * 1.5,
  },
  highlightBox: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    alignItems: 'flex-start',
  },
  highlightIcon: {
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  highlightText: {
    flex: 1,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    lineHeight: Typography.size.sm * 1.5,
  },
  button: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.base.white,
  },
});