import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows } from '@/constants/theme';
import { usePreventRemove } from '@react-navigation/native';

type TripStatus = 'searching' | 'accepted' | 'arrived' | 'in_progress';

export default function TripTrackingScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [status, setStatus] = useState<TripStatus>('searching');

  // Bloquea el gesto de "atrás" durante un viaje activo para evitar perder la pantalla
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
            // Permite que la acción de navegación continúe si el usuario confirma
            onPress: () => navigation.dispatch(data.action),
          },
        ]
      );
    }
  );

  // SIMULACIÓN DE ESTADOS DEL VIAJE (Backend Mock)
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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 19.4326, longitude: -99.1332,
          latitudeDelta: 0.01, longitudeDelta: 0.01,
        }}
      >
        {status !== 'searching' && (
            <>
                <Marker coordinate={{ latitude: 19.4340, longitude: -99.1350 }}>
                    <View style={styles.carMarker}>
                        <Ionicons name="car-sport" size={20} color={Colors.base.white} />
                    </View>
                </Marker>
                
                <Polyline 
                    coordinates={[
                        { latitude: 19.4340, longitude: -99.1350 },
                        { latitude: 19.4326, longitude: -99.1332 }
                    ]}
                    strokeColor={Colors.brand.primary}
                    strokeWidth={4}
                />
            </>
        )}
        
        <Marker coordinate={{ latitude: 19.4326, longitude: -99.1332 }}>
            <View style={styles.myLocationDot} />
        </Marker>
      </MapView>

      <SafeAreaView style={styles.topContainer}>
        <View style={styles.statusPill}>
            {status === 'searching' && <ActivityIndicator size="small" color={Colors.base.white} />}
            <Text style={styles.statusText}>
                {status === 'searching' && ' Buscando conductor cercano...'}
                {status === 'accepted' && ' Conductor en camino • 4 min'}
                {status === 'arrived' && ' ¡Tu conductor ha llegado!'}
                {status === 'in_progress' && ' En viaje a destino'}
            </Text>
        </View>
      </SafeAreaView>

      <View style={styles.bottomSheet}>
        {status === 'searching' ? (
             <View style={styles.searchingContainer}>
                <Text style={styles.searchingTitle}>Conectando con conductores...</Text>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelText}>Cancelar Solicitud</Text>
                </TouchableOpacity>
             </View>
        ) : (
            <>
                <View style={styles.driverRow}>
                    <View>
                        <Text style={styles.plateText}>MX • 723-AZW</Text>
                        <Text style={styles.carModel}>Nissan Versa • Gris</Text>
                        <Text style={styles.driverName}>Carlos Mendoza</Text>
                        <View style={styles.ratingBox}>
                            <Ionicons name="star" size={12} color={Colors.semantic.warning} />
                            <Text style={styles.ratingText}>4.9</Text>
                        </View>
                    </View>
                    <Image 
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                        style={styles.driverAvatar} 
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="call-outline" size={24} color={Colors.grey[800]} />
                        <Text style={styles.actionLabel}>Llamar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.actionBtn}
                        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: 'trip_123' } })}
                    >
                        <Ionicons name="chatbubble-outline" size={24} color={Colors.grey[800]} />
                        <Text style={styles.actionLabel}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="share-social-outline" size={24} color={Colors.grey[800]} />
                        <Text style={styles.actionLabel}>Compartir</Text>
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
  
  carMarker: { backgroundColor: Colors.brand.primary, padding: Spacing.sm, borderRadius: 20, borderWidth: 2, borderColor: Colors.base.white },
  myLocationDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.social.apple, borderWidth: 3, borderColor: Colors.base.white, ...Shadows.md },

  topContainer: { alignItems: 'center', marginTop: Spacing.sm },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[800], paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: 30, ...Shadows.lg },
  statusText: { color: Colors.base.white, fontWeight: Typography.weight.bold, marginLeft: Spacing.sm },

  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: Colors.base.white, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: Spacing.lg, ...Shadows.xl },
  
  searchingContainer: { alignItems: 'center', paddingVertical: Spacing.lg },
  searchingTitle: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.light.text, marginBottom: Spacing.lg },
  cancelButton: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, borderRadius: 20, backgroundColor: Colors.grey[200] },
  cancelText: { color: Colors.light.text, fontWeight: Typography.weight.semibold },

  driverRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  plateText: { fontSize: Typography.size.lg, fontWeight: Typography.weight.black, color: Colors.light.text, letterSpacing: 1 },
  carModel: { fontSize: Typography.size.base, color: Colors.grey[600], marginVertical: 2 },
  driverName: { fontSize: Typography.size.base, fontWeight: Typography.weight.semibold, color: Colors.grey[700] },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[100], alignSelf: 'flex-start', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs, borderRadius: 10, marginTop: Spacing.xs },
  ratingText: { fontSize: Typography.size.xs, fontWeight: Typography.weight.bold, marginLeft: Spacing.xs },
  driverAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: Colors.grey[200] },
  
  divider: { height: 1, backgroundColor: Colors.grey[200], marginBottom: Spacing.lg },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { alignItems: 'center', width: 60 },
  actionLabel: { fontSize: Typography.size.xs, color: Colors.grey[700], marginTop: Spacing.xs }
});
