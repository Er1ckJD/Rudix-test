import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HelpSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const HelpItem = ({ question }: { question: string }) => (
    <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{question}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
    </TouchableOpacity>
)

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Centro de Ayuda' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿Cómo podemos ayudarte?</Text>
        
        <HelpSection title="Cuenta y Pagos">
            <HelpItem question="No puedo iniciar sesión" />
            <HelpItem question="¿Cómo actualizo mi método de pago?" />
            <HelpItem question="Tengo un cargo desconocido" />
        </HelpSection>

        <HelpSection title="Viajes">
            <HelpItem question="Reportar un problema con un viaje" />
            <HelpItem question="Objeto perdido" />
            <HelpItem question="Cancelar un viaje" />
        </HelpSection>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
