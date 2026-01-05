import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows } from '@/constants/theme';
import { usePreventRemove } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocation } from '@/hooks/useLocation';
import Toast from 'react-native-toast-message';

type TripStatus = 'searching' | 'accepted' | 'arrived' | 'in_progress';

export default function TripTrackingScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [status, setStatus] = useState<TripStatus>('searching');
  const { colorScheme } = useColorScheme();
  const { location } = useLocation();
  const isDark = colorScheme === 'dark';

  usePreventRemove(
    status === 'accepted' || status === 'arrived' || status === 'in_progress',
    ({ data }) => {
      Alert.alert(
        '¿Salir de la pantalla del viaje?',
        'Hay un viaje en curso. Si sales, puedes volver a encontrar el seguimiento desde el menú principal.',
        [
          { text: "Quedarse", style: 'cancel', onPress: () => {} },
          { 
            text: 'Salir',
            style: 'destructive',
            onPress: () => navigation.dispatch(data.action),
          },
        ]
      );
    }
  );

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('accepted'), 4000);
    const timer2 = setTimeout(() => setStatus('arrived'), 10000);
    const timer3 = setTimeout(() => setStatus('in_progress'), 15000);
    const timer4 = setTimeout(() => {
        router.replace('/(passenger)/ride/rating'); 
    }, 25000);

    return () => {
      clearTimeout(timer1); clearTimeout(timer2);
      clearTimeout(timer3); clearTimeout(timer4);
    };
  }, []);

  const handleCancel = () => {
    Alert.alert("Cancelar Viaje", "¿Seguro que deseas cancelar? Se aplicará una tarifa de cancelación.", [
        { text: "No", style: "cancel" },
        { text: "Sí, cancelar", style: "destructive", onPress: () => router.replace('/(passenger)/(home)') }
    ]);
  };

  const showNotImplementedToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Función no implementada',
    });
  };

  if (!location) {
      return <View style={styles.container}><ActivityIndicator size="large" color={Colors.brand.primary}/></View>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: location.coords.latitude, longitude: location.coords.longitude,
          latitudeDelta: 0.01, longitudeDelta: 0.01,
        }}
      >
        {status !== 'searching' && (
            <>
                <Marker coordinate={{ latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude + 0.001 }}>
                    <View style={styles.carMarker}>
                        <Ionicons name="car-sport" size={20} color={Colors.base.white} />
                    </View>
                </Marker>
                
                <Polyline 
                    coordinates={[
                        { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude + 0.001 },
                        { latitude: location.coords.latitude, longitude: location.coords.longitude }
                    ]}
                    strokeColor={Colors.brand.primary}
                    strokeWidth={4}
                />
            </>
        )}
        
        <Marker coordinate={location.coords}>
            <View style={styles.myLocationDot} />
        </Marker>
      </MapView>

      <SafeAreaView style={styles.topContainer}>
        <View style={[styles.statusPill, isDark && styles.statusPillDark]}>
            {status === 'searching' && <ActivityIndicator size="small" color={Colors.base.white} />}
            <Text style={styles.statusText}>
                {status === 'searching' && ' Buscando conductor cercano...'}
                {status === 'accepted' && ' Conductor en camino • 4 min'}
                {status === 'arrived' && ' ¡Tu conductor ha llegado!'}
                {status === 'in_progress' && ' En viaje a destino'}
            </Text>
        </View>
      </SafeAreaView>

      <View style={[styles.bottomSheet, isDark && styles.bottomSheetDark]}>
        {status === 'searching' ? (
             <View style={styles.searchingContainer}>
                <Text style={[styles.searchingTitle, isDark && styles.textDark]}>Conectando con conductores...</Text>
                <TouchableOpacity style={[styles.cancelButton, isDark && styles.cancelButtonDark]} onPress={handleCancel}>
                    <Text style={[styles.cancelText, isDark && styles.textDark]}>Cancelar Solicitud</Text>
                </TouchableOpacity>
             </View>
        ) : (
            <>
                <View style={styles.driverRow}>
                    <View>
                        <Text style={[styles.plateText, isDark && styles.textDark]}>MX • 723-AZW</Text>
                        <Text style={[styles.carModel, isDark && styles.textDarkSecondary]}>Nissan Versa • Gris</Text>
                        <Text style={[styles.driverName, isDark && styles.textDarkSecondary]}>Carlos Mendoza</Text>
                        <View style={[styles.ratingBox, isDark && styles.ratingBoxDark]}>
                            <Ionicons name="star" size={12} color={Colors.semantic.warning} />
                            <Text style={styles.ratingText}>4.9</Text>
                        </View>
                    </View>
                    <Image 
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                        style={styles.driverAvatar} 
                    />
                </View>

                <View style={[styles.divider, isDark && styles.dividerDark]} />

                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn} onPress={showNotImplementedToast}>
                        <Ionicons name="call-outline" size={24} color={isDark ? Colors.dark.text : Colors.grey[800]} />
                        <Text style={[styles.actionLabel, isDark && styles.textDarkSecondary]}>Llamar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.actionBtn}
                        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: 'trip_123' } })}
                    >
                        <Ionicons name="chatbubble-outline" size={24} color={isDark ? Colors.dark.text : Colors.grey[800]} />
                        <Text style={[styles.actionLabel, isDark && styles.textDarkSecondary]}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn} onPress={showNotImplementedToast}>
                        <Ionicons name="share-social-outline" size={24} color={isDark ? Colors.dark.text : Colors.grey[800]} />
                        <Text style={[styles.actionLabel, isDark && styles.textDarkSecondary]}>Compartir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionBtn, { opacity: 0.5 }]} onPress={handleCancel}>
                        <Ionicons name="close-circle-outline" size={24} color={Colors.semantic.error} />
                        <Text style={[styles.actionLabel, { color: Colors.semantic.error }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grey[100] },
  textDark: { color: Colors.dark.text },
  textDarkSecondary: { color: Colors.dark.textSecondary },
  
  carMarker: { backgroundColor: Colors.brand.primary, padding: Spacing.sm, borderRadius: 20, borderWidth: 2, borderColor: Colors.base.white },
  myLocationDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.brand.primary, borderWidth: 3, borderColor: Colors.base.white, ...Shadows.md },

  topContainer: { alignItems: 'center', marginTop: Spacing.sm },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[800], paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: 30, ...Shadows.lg },
  statusPillDark: { backgroundColor: Colors.grey[200] },
  statusText: { color: Colors.base.white, fontWeight: Typography.weight.bold, marginLeft: Spacing.sm },

  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: Colors.base.white, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: Spacing.lg, ...Shadows.xl },
  bottomSheetDark: { backgroundColor: Colors.dark.surface },
  
  searchingContainer: { alignItems: 'center', paddingVertical: Spacing.lg },
  searchingTitle: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.light.text, marginBottom: Spacing.lg },
  cancelButton: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, borderRadius: 20, backgroundColor: Colors.grey[200] },
  cancelButtonDark: { backgroundColor: Colors.grey[800] },
  cancelText: { color: Colors.light.text, fontWeight: Typography.weight.semibold },

  driverRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  plateText: { fontSize: Typography.size.lg, fontWeight: Typography.weight.black, color: Colors.light.text, letterSpacing: 1 },
  carModel: { fontSize: Typography.size.base, color: Colors.grey[600], marginVertical: 2 },
  driverName: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.grey[700] },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[100], alignSelf: 'flex-start', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: 10, marginTop: Spacing.xs },
  ratingBoxDark: { backgroundColor: Colors.dark.background },
  ratingText: { fontSize: Typography.size.xs, fontWeight: Typography.weight.bold, marginLeft: Spacing.xs },
  driverAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: Colors.grey[200] },
  
  divider: { height: 1, backgroundColor: Colors.grey[200], marginBottom: Spacing.lg },
  dividerDark: { backgroundColor: Colors.dark.border },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { alignItems: 'center', width: 60 },
  actionLabel: { fontSize: Typography.size.xs, color: Colors.grey[700], marginTop: Spacing.xs }
});
