import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

interface RideRequestModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function RideRequestModal({ visible, onAccept, onDecline }: RideRequestModalProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const progress = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      setTimeLeft(15);
      progress.value = 1; // Reset progress
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onDecline();
            return 0;
          }
          // Update progress bar
          progress.value = withTiming((prev - 1) / 15, { duration: 1000, easing: Easing.linear });
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [visible, progress, onDecline]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* BARRA DE TIEMPO */}
          <View style={styles.timerBarContainer}>
            <Animated.View style={[styles.timerBar, animatedProgressStyle]} />
          </View>

          {/* Encabezado */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Ionicons name="timer-outline" size={14} color={Colors.common.white} />
              <Text style={styles.badgeText}>{timeLeft}s</Text>
            </View>
            <Text style={styles.price}>$85.50</Text>
          </View>

          <Text style={styles.tripType}>Viaje Estándar • 2.5 km</Text>

          {/* Ruta */}
          <View style={styles.routeContainer}>
            <View style={styles.stop}>
              <View style={[styles.dot, { backgroundColor: Colors.light.primary }]} />
              <Text style={styles.address}>Av. Reforma 222</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.stop}>
              <View style={[styles.dot, { backgroundColor: Colors.common.black }]} />
              <Text style={styles.address}>Plaza Las Américas</Text>
            </View>
          </View>

          {/* Botones */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.declineBtn} onPress={onDecline}>
              <Ionicons name="close" size={30} color={Colors.grey[1200]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
              <Text style={styles.acceptText}>Aceptar Viaje</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end', padding: 10 },
  card: {
    backgroundColor: Colors.common.white,
    borderRadius: 30, // Más redondeado
    padding: 25,
    marginBottom: 20,
    overflow: 'hidden', // Para que la barra no se salga
    // Sombra "Premium"
    shadowColor: Colors.common.black, // Sombra negra se ve mejor aquí
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
  },
  timerBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.grey[300],
  },
  timerBar: {
    height: '100%',
    backgroundColor: Colors.light.primary,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, marginTop: 10 },
  badge: { flexDirection: 'row', backgroundColor: Colors.grey[1400], paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, gap: 5, alignItems: 'center' },
  badgeText: { color: Colors.common.white, fontWeight: 'bold', fontSize: 12 },
  price: { fontSize: 48, fontWeight: 'bold', color: Colors.light.primary }, // PRECIO GIGANTE
  tripType: { textAlign: 'center', color: Colors.grey[1000], marginBottom: 20, fontSize: 12, fontWeight: '600' },
  routeContainer: { marginBottom: 25 },
  stop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  address: { fontSize: 16, fontWeight: '500', color: Colors.grey[1400] },
  line: { height: 20, borderLeftWidth: 1, borderLeftColor: Colors.grey[800], marginLeft: 4.5, marginVertical: 2 },
  actions: { flexDirection: 'row', gap: 15 },
  declineBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.grey[300], alignItems: 'center', justifyContent: 'center' },
  acceptBtn: { flex: 1, height: 60, backgroundColor: Colors.light.primary, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  acceptText: { color: Colors.common.white, fontSize: 20, fontWeight: 'bold' }
});