import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

const DATA = [
  { day: 'L', value: 40 },
  { day: 'M', value: 70 },
  { day: 'M', value: 30 },
  { day: 'J', value: 90 }, // Día más alto
  { day: 'V', value: 60 },
  { day: 'S', value: 80 },
  { day: 'D', value: 50 },
];

export default function WeeklyChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen Semanal</Text>
      <View style={styles.chartContainer}>
        {DATA.map((item, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: `${item.value}%`, opacity: item.value > 80 ? 1 : 0.4 }]} />
            <Text style={styles.dayText}>{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.common.white, padding: 20, borderRadius: 20, marginBottom: 20 },
  title: { fontSize: 16, fontWeight: 'bold', color: Colors.grey[1400], marginBottom: 20 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  barWrapper: { alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: 20 },
  bar: { width: 8, backgroundColor: Colors.light.primary, borderRadius: 4, marginBottom: 8 },
  dayText: { fontSize: 12, color: Colors.grey[900] },
});