import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Términos y Condiciones' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Términos y Condiciones</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
          fermentum aliquam, nunc nisl aliquet nunc, eget aliquam nisl nisl eu nunc.
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas.
        </Text>
        <Text style={styles.paragraph}>
          Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus.
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
