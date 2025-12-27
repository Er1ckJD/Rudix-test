import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/theme';

export default function EarningsHeader() {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <View style={styles.contentRow}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.amount}>250.00</Text>
        </View>
        <Text style={styles.label}>Ganancias de hoy</Text>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 40, // Más redondo
    alignItems: 'center',
    overflow: 'hidden', // Necesario para el Blur
    backgroundColor: 'rgba(0,0,0,0.4)', // Fondo semitransparente oscuro
    position: 'absolute', // Keep it floating
    top: 60,
    alignSelf: 'center',
    zIndex: 10,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    color: Colors.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    color: Colors.common.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  label: {
    color: Colors.grey[400], // Lighter grey for dark background
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});