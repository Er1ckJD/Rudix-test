import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const handlePress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Contáctanos' }} />
      <View style={styles.content}>
        <Text style={styles.title}>Ponte en contacto</Text>
        <Text style={styles.subtitle}>
          Estamos aquí para ayudarte. Elige una de las siguientes opciones para contactarnos.
        </Text>
        <TouchableOpacity style={styles.option} onPress={() => handlePress('mailto:support@rudix.com')}>
          <Ionicons name="mail-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Enviar un correo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handlePress('tel:+1234567890')}>
          <Ionicons name="call-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Llamar a soporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handlePress('https://rudix.com/faq')}>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Visitar sección de FAQ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
  },
});
