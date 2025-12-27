import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Share, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
export default function SecurityScreen() {
  const router = useRouter();
  
   

  const handleShareTrip = async () => {
    try {
      await Share.share({
        message: 'Estoy en un viaje de RuDix. Sigue mi ubicación en tiempo real: [link-a-mapa-en-vivo]',
        // url: 'https://rudix.com/trip/xyz123' // (Opcional) URL real del viaje
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCallEmergency = () => {
    // Nota: El número puede variar por país. 911 es común en Norteamérica.
    Linking.openURL('tel:911').catch(err => 
      Alert.alert('Error', 'No se pudo realizar la llamada. Por favor, marca manualmente.')
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true,
        headerTitle: 'Centro de Seguridad',
        headerTitleStyle: { color: Colors.grey[1400] },
        headerStyle: { backgroundColor: Colors.grey[100] },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <Ionicons name="chevron-back" size={28} color={Colors.common.black} />
          </TouchableOpacity>
        )
      }} />

      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- ACCIONES RÁPIDAS --- */}
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsGrid}>
          <ActionCard
            icon="shield-half-outline"
            label="Compartir Viaje"
            onPress={handleShareTrip}
          />
          <ActionCard
            icon="call-outline"
            label="Llamar al 911"
            onPress={handleCallEmergency}
            isEmergency
          />
        </View>

        {/* --- NORMAS Y RECOMENDACIONES --- */}
        <Text style={styles.sectionTitle}>Normas de la Comunidad</Text>
        <RuleItem
          title="Uso de cubrebocas opcional"
          description="Basado en las regulaciones locales, el uso de cubrebocas es a discreción de cada persona."
        />
        <RuleItem
          title="Cero tolerancia a la discriminación"
          description="Fomentamos un ambiente de respeto mutuo. Cualquier reporte de discriminación resultará en la suspensión de la cuenta."
        />
        <RuleItem
          title="Verificación de usuario y conductor"
          description="Ambos, usuarios y conductores, deben tener su identidad verificada para poder usar la plataforma."
        />
        <RuleItem
          title="Asientos delanteros"
          description="El asiento del copiloto puede ser utilizado si tanto el conductor como el pasajero están de acuerdo."
        />
      </ScrollView>
    </View>
  );
}

const ActionCard = ({ icon, label, onPress, isEmergency = false }: any) => (
  <TouchableOpacity style={[styles.card, isEmergency && styles.emergencyCard]} onPress={onPress}>
    <Ionicons name={icon} size={32} color={isEmergency ? Colors.common.white : Colors.light.primary} />
    <Text style={[styles.cardLabel, isEmergency && { color: Colors.common.white }]}>{label}</Text>
  </TouchableOpacity>
);

const RuleItem = ({ title, description }: { title: string, description: string }) => (
    <View style={styles.ruleContainer}>
        <Text style={styles.ruleTitle}>{title}</Text>
        <Text style={styles.ruleDescription}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey[100], // Color de fondo de la página
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.grey[100], // Mismo color que el fondo para un efecto limpio
    paddingBottom: 15,
    alignItems: 'center',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[300],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey[1400],
  },
  backButton: {
      marginLeft: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 20,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.grey[1400],
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.common.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  emergencyCard: {
      backgroundColor: Colors.common.error,
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.grey[1200],
  },
  ruleContainer: {
    backgroundColor: Colors.common.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12
  },
  ruleTitle: {
      fontWeight: 'bold',
      fontSize: 15,
      color: Colors.grey[1400],
      marginBottom: 4,
  },
  ruleDescription: {
      fontSize: 14,
      color: Colors.grey[1100],
      lineHeight: 20,
  }
});
