import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function AddCardScreen() {
  const { createPaymentMethod } = useStripe();
  const router = useRouter();
  const [isReady, setReady] = useState(false);

  const handleSaveCard = async () => {
    if (!isReady) {
      Alert.alert('Error', 'Por favor, completa los datos de la tarjeta.');
      return;
    }

    try {
      const paymentMethod = await createPaymentMethod({
        type: 'Card',
      });

      if (paymentMethod.error) {
        Alert.alert('Error al guardar', paymentMethod.error.message);
        return;
      }

      // En una app real, enviarías paymentMethod.paymentMethod.id a tu backend
      // para asociarlo al cliente de Stripe.
      console.log('PaymentMethod:', paymentMethod.paymentMethod);

      Toast.show({
        type: 'success',
        text1: 'Tarjeta Agregada',
        text2: 'Tu método de pago se ha guardado con éxito.',
      });

      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al guardar tu tarjeta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Agregar Nueva Tarjeta</Text>
        <Text style={styles.subtitle}>
          Ingresa los datos de tu tarjeta de crédito o débito.
        </Text>

        <CardField
          postalCodeEnabled={false}
          style={styles.cardField}
          onCardChange={(cardDetails) => {
            setReady(cardDetails.complete);
          }}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Guardar Tarjeta"
          onPress={handleSaveCard}
          disabled={!isReady}
          variant={isReady ? 'primary' : 'disabled'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
