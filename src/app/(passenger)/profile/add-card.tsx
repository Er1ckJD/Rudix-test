import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { Colors, Spacing } from '@/constants/theme';
import { useRouter, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AddCardScreen() {
  const { createPaymentMethod } = useStripe();
  const router = useRouter();
  const [isReady, setReady] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSaveCard = async () => {
    if (!isReady) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Por favor, completa los datos de la tarjeta.' });
      return;
    }

    try {
      const paymentMethod = await createPaymentMethod({
        type: 'Card',
      });

      if (paymentMethod.error) {
        Toast.show({ type: 'error', text1: 'Error al guardar', text2: paymentMethod.error.message });
        return;
      }

      console.log('PaymentMethod:', paymentMethod.paymentMethod);

      Toast.show({
        type: 'success',
        text1: 'Tarjeta Agregada',
        text2: 'Tu método de pago se ha guardado con éxito.',
      });

      router.back();

    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Ocurrió un problema al guardar tu tarjeta.' });
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen options={{ title: 'Agregar Tarjeta' }}/>
      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.textDark]}>Agregar Nueva Tarjeta</Text>
        <Text style={[styles.subtitle, isDark && styles.textDarkSecondary]}>
          Ingresa los datos de tu tarjeta de crédito o débito.
        </Text>

        <CardField
          postalCodeEnabled={false}
          style={styles.cardField}
          cardStyle={{
            backgroundColor: isDark ? Colors.dark.surface : Colors.base.white,
            textColor: isDark ? Colors.dark.text : Colors.light.text,
          }}
          onCardChange={(cardDetails) => {
            setReady(cardDetails.complete);
          }}
        />
      </View>

      <View style={[styles.footer, isDark && styles.footerDark]}>
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
    backgroundColor: Colors.grey[50],
  },
  containerDark: {
    backgroundColor: Colors.dark.background,
  },
  textDark: {
    color: Colors.dark.text,
  },
  textDarkSecondary: {
    color: Colors.dark.textSecondary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.grey[200],
  },
  footerDark: {
    borderTopColor: Colors.dark.border,
  }
});
