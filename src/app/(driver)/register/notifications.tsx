import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotifications } from '@/hooks/useNotifications';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

export default function NotificationsScreen() {
  const router = useRouter();
  const { expoPushToken } = useNotifications();

  const handleNext = () => {
    if (!expoPushToken) {
        Toast.show({
            type: 'error',
            text1: 'Habilitar Notificaciones',
            text2: 'Por favor, habilita las notificaciones para continuar.',
        });
        return;
    }
    router.push('/(driver)/register/success');
  };
  
  const copyToClipboard = async () => {
    if (expoPushToken) {
        await Clipboard.setStringAsync(expoPushToken);
        Toast.show({
            type: 'success',
            text1: 'Copiado',
            text2: 'Token de notificación copiado al portapapeles.',
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.base.black} />
            </TouchableOpacity>
        </View>
      <Text style={styles.title}>Activa las notificaciones para no perderte viajes</Text>
      
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <View style={styles.content}>
        <Ionicons name="notifications-circle" size={80} color={Colors.brand.primary} />
        <Text style={styles.infoText}>
            Para brindarte el mejor servicio y notificarte sobre nuevas solicitudes de viaje, necesitamos tu permiso para enviarte notificaciones.
        </Text>

        {expoPushToken ? (
            <View style={styles.tokenContainer}>
                <Text style={styles.tokenTitle}>¡Permiso Concedido!</Text>
                <Text style={styles.tokenText} numberOfLines={2}>{expoPushToken}</Text>
                <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                    <Ionicons name="copy-outline" size={20} color={Colors.brand.primary} />
                    <Text style={styles.copyButtonText}>Copiar Token</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.tokenContainer}>
                <ActivityIndicator size="large" color={Colors.brand.primary} />
                <Text style={{marginTop: 10, color: Colors.light.textSecondary}}>Obteniendo permiso...</Text>
            </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handleNext}>
              <Text style={styles.btnText}>Siguiente</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.base.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white, paddingHorizontal: 20, paddingTop: 20 },
  header: { width: '100%', alignItems: 'flex-start', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.brand.primary, textAlign: 'center', marginTop: 10, marginBottom: 20 },
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
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  tokenContainer: {
      marginTop: 30,
      alignItems: 'center',
      padding: 15,
      backgroundColor: Colors.grey[100],
      borderRadius: 15,
      width: '100%',
  },
  tokenTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.brand.primary,
  },
  tokenText: {
      fontSize: 12,
      color: Colors.grey[500],
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
    color: Colors.brand.primary,
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 20,
    width: '100%',
  },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});
