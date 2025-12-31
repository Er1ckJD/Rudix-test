import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ServiceTypeScreen() {
  const router = useRouter();
  
  // Componente interno para la tarjeta de selección
  const ServiceCard = ({ title, description, benefits, type }: any) => (
    <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push({ pathname: '/driver/register/vehicle-info', params: { type } })}
    >
        <Image 
            // Usa una imagen de coche placeholder por ahora
            source={require('@/assets/images/react-logo.png')} 
            style={styles.carImage} 
        />
        <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDesc}>{description}</Text>
            <Text style={styles.cardBenefits}>{benefits}</Text>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>¿Qué tipo de servicio te gustaría ofrecer?</Text>
        <Text style={styles.subtitle}>Con las comisiones más bajas del mercado</Text>

        <ServiceCard 
          title="Estándar" 
          description="Ideal para viajes diarios, rápidos y con alta demanda."
          benefits="Gana más con trayectos frecuentes en zonas urbanas."
          type="standard"
        />

        <ServiceCard 
          title="Lux" 
          description="Para quienes buscan elegancia y mayores ingresos."
          benefits="Tarifas premium, clientes exclusivos y beneficios extra."
          type="lux"
        />

          {/* Cochecito footer */}
        <Image 
              source={require('@/assets/images/react-logo.png')} 
              style={[styles.carImage, {alignSelf: 'center', marginTop: 50, opacity: 0.5}]} 
          />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 20, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 40 },
  
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset:{width:0, height:2}
  },
  carImage: { width: 80, height: 50, resizeMode: 'contain', marginRight: 15 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 5 },
  cardDesc: { fontSize: 12, color: '#666', marginBottom: 5 },
  cardBenefits: { fontSize: 11, color: '#888' },
});