import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Política de Privacidad' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Política de Privacidad</Text>
        <Text style={styles.paragraph}>
          Esta política de privacidad describe cómo se recopila, utiliza y comparte su
          información personal cuando utiliza nuestra aplicación.
        </Text>
        <Text style={styles.paragraph}>
          Nos tomamos muy en serio su privacidad y nos comprometemos a proteger su
          información personal. No compartiremos su información con terceros, excepto
          en los casos descritos en esta política de privacidad.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
});
