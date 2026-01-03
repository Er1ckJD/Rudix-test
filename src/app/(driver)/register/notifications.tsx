import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotifications } from '@/hooks/useNotifications';
import * as Clipboard from 'expo-clipboard';

export default function NotificationsScreen() {
  const router = useRouter();
  const { expoPushToken } = useNotifications();

  const handleNext = () => {
    if (!expoPushToken) {
        Alert.alert(
            "Habilitar Notificaciones",
            "Por favor, habilita las notificaciones para continuar."
        );
        return;
    }
    router.push('/(driver)/register/success');
  };
  
  const copyToClipboard = async () => {
    if (expoPushToken) {
        await Clipboard.setStringAsync(expoPushToken);
        Alert.alert("Copiado", "Token de notificación copiado al portapapeles.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Activa las notificaciones para no perderte viajes</Text>
      
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <View style={styles.content}>
        <Ionicons name="notifications-circle" size={80} color={Colors.light.primary} />
        <Text style={styles.infoText}>
            Para brindarte el mejor servicio y notificarte sobre nuevas solicitudes de viaje, necesitamos tu permiso para enviarte notificaciones.
        </Text>

        {expoPushToken ? (
            <View style={styles.tokenContainer}>
                <Text style={styles.tokenTitle}>¡Permiso Concedido!</Text>
                <Text style={styles.tokenText} numberOfLines={2}>{expoPushToken}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                    <Ionicons name="copy-outline" size={20} color={Colors.light.primary} />
                    <Text style={styles.copyButtonText}>Copiar Token</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.tokenContainer}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
                <Text style={{marginTop: 10, color: '#666'}}>Obteniendo permiso...</Text>
            </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handleNext}>
              <Text style={styles.btnText}>Siguiente</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginTop: 30, marginBottom: 20 },
  image: { width: 120, height: 120, marginBottom: 20, alignSelf: 'center', opacity: 0.1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -120,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  tokenContainer: {
      marginTop: 30,
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#f5f5f5',
      borderRadius: 15,
      width: '100%',
  },
  tokenTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.light.primary,
  },
  tokenText: {
      fontSize: 12,
      color: '#999',
      textAlign: 'center',
      marginVertical: 10,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  copyButtonText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 20,
    width: '100%',
  },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
