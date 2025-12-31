import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Button from '@/components/ui/Button';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '@/constants/theme';

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
        // Navegar a la pantalla de seguimiento del viaje
        router.push('/(passenger)/ride/tracking'); 
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Elige tu viaje', headerShadowVisible: false }} />
            
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
                    <Marker coordinate={{ latitude: 19.4326, longitude: -99.1332 }} />
                 </MapView>
                 
                 <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.base.black} />
                 </TouchableOpacity>
            </View>

            <View style={styles.bottomSheet}>
                <Text style={styles.destinationTitle}>Viaje a {destination}</Text>
                
                <FlatList
                    data={SERVICE_OPTIONS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ marginVertical: Spacing.sm }}
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
                                <Ionicons name={item.icon as any} size={40} color={Colors.grey[800]} />
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
                    <Ionicons name="cash-outline" size={20} color={Colors.grey[800]} />
                    <Text style={styles.paymentText}>Efectivo</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.grey[600]} />
                </View>

                <Button 
                    title="Confirmar Viaje" 
                    onPress={handleConfirm}
                    fullWidth
                    gradient
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: Colors.base.white 
    },
    mapContainer: { 
      flex: 1 
    },
    backButton: { 
      position: 'absolute', 
      top: 50, 
      left: Spacing.lg, 
      backgroundColor: Colors.base.white, 
      padding: Spacing.sm, 
      borderRadius: BorderRadius.full, 
      ...Shadows.lg 
    },
    
    bottomSheet: { 
        backgroundColor: Colors.base.white, 
        borderTopLeftRadius: BorderRadius.xl, 
        borderTopRightRadius: BorderRadius.xl, 
        padding: Spacing.lg, 
        paddingBottom: Spacing.xl,
        ...Shadows.xl
    },
    destinationTitle: { 
      fontSize: Typography.size.lg, 
      fontWeight: Typography.weight.bold, 
      color: Colors.light.text, 
      marginBottom: Spacing.md, 
      textAlign: 'center' 
    },
    
    optionCard: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: Spacing.md, 
        borderRadius: BorderRadius.md, 
        marginBottom: Spacing.sm,
        borderWidth: 2, 
        borderColor: Colors.base.transparent,
        backgroundColor: Colors.grey[100]
    },
    optionSelected: { 
      borderColor: Colors.brand.primary, 
      backgroundColor: Colors.brand.primary + '15' 
    },
    optionLeft: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      gap: Spacing.md 
    },
    optionName: { 
      fontWeight: Typography.weight.bold, 
      fontSize: Typography.size.md, 
      color: Colors.light.text 
    },
    optionTime: { 
      fontSize: Typography.size.sm, 
      color: Colors.grey[600] 
    },
    optionPrice: { 
      fontWeight: Typography.weight.bold, 
      fontSize: Typography.size.lg, 
      color: Colors.light.text 
    },

    paymentRow: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      gap: Spacing.sm, 
      paddingVertical: Spacing.md, 
      justifyContent: 'center' 
    },
    paymentText: { 
      fontWeight: Typography.weight.medium, 
      color: Colors.light.text 
    }
});
