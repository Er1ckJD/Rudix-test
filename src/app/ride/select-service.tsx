import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import MapView, { Marker } from 'react-native-maps';
import AuthButton from '@/components/ui/AuthButton';

// Opciones de servicio simuladas
const SERVICE_OPTIONS = [
    { id: 'eco', name: 'RuDix Eco', price: 85.50, time: '14:32', icon: 'car-sport-outline' },
    { id: 'plus', name: 'RuDix Plus', price: 120.00, time: '14:30', icon: 'car-sport' },
    { id: 'taxi', name: 'Taxi Local', price: 70.00, time: '14:35', icon: 'bicycle' },
];

export default function SelectServiceScreen() {
    const router = useRouter();
    const { destination } = useLocalSearchParams<{ destination: string }>();
    const [selectedId, setSelectedId] = useState('eco');

    const handleConfirm = () => {
        // En una app real, aquí enviarías la petición al servidor.
        // Simulamos éxito inmediato:
        router.push('/ride/trip-tracking'); 
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Elige tu viaje', headerShadowVisible: false }} />
            
            {/* Mapa de fondo simulado con ruta */}
            <View style={styles.mapContainer}>
                 <MapView 
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: 19.4326, 
                        longitude: -99.1332,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                 >
                    {/* Marcador Destino */}
                    <Marker coordinate={{ latitude: 19.4326, longitude: -99.1332 }} />
                 </MapView>
                 
                 {/* Botón flotante atrás */}
                 <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                 </TouchableOpacity>
            </View>

            {/* Hoja inferior de selección */}
            <View style={styles.bottomSheet}>
                <Text style={styles.destinationTitle}>Viaje a {destination}</Text>
                
                <FlatList
                    data={SERVICE_OPTIONS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ marginVertical: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[
                                styles.optionCard, 
                                selectedId === item.id && styles.optionSelected
                            ]}
                            onPress={() => setSelectedId(item.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.optionLeft}>
                                <Ionicons name={item.icon as any} size={40} color={Colors.grey[1400]} />
                                <View>
                                    <Text style={styles.optionName}>{item.name}</Text>
                                    <Text style={styles.optionTime}>{item.time} • 4 min</Text>
                                </View>
                            </View>
                            <Text style={styles.optionPrice}>${item.price.toFixed(2)}</Text>
                        </TouchableOpacity>
                    )}
                />

                <View style={styles.paymentRow}>
                    <Ionicons name="cash-outline" size={20} color={Colors.grey[1400]} />
                    <Text style={styles.paymentText}>Efectivo</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.grey[800]} />
                </View>

                <AuthButton 
                    title="Confirmar Viaje" 
                    onPress={handleConfirm}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    mapContainer: { flex: 1 },
    backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: '#fff', padding: 10, borderRadius: 25, elevation: 5 },
    
    bottomSheet: { 
        backgroundColor: '#fff', 
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
        padding: 20, 
        paddingBottom: 40,
        elevation: 20,
        shadowColor: '#000', shadowOffset: {width:0, height:-2}, shadowOpacity: 0.1, shadowRadius: 10
    },
    destinationTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.grey[1400], marginBottom: 15, textAlign: 'center' },
    
    optionCard: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 15, borderRadius: 12, marginBottom: 10,
        borderWidth: 2, borderColor: 'transparent',
        backgroundColor: Colors.grey[100]
    },
    optionSelected: { borderColor: Colors.light.primary, backgroundColor: Colors.light.primary + '10' },
    optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    optionName: { fontWeight: 'bold', fontSize: 16, color: Colors.grey[1400] },
    optionTime: { fontSize: 12, color: Colors.grey[900] },
    optionPrice: { fontWeight: 'bold', fontSize: 18, color: Colors.grey[1400] },

    paymentRow: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 15, justifyContent: 'center' },
    paymentText: { fontWeight: '500', color: Colors.grey[1400] }
});