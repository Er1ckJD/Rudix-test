import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Button from '@/components/ui/Button';
import { Colors, Spacing, Typography, Shadows, BorderRadius, hexWithOpacity } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocation } from '@/hooks/useLocation';
import Toast from 'react-native-toast-message';

// Opciones de servicio simuladas
const SERVICE_OPTIONS = [
    { id: 'eco', name: 'RuDix Eco', price: 85.50, time: '14:32', icon: 'car-sport-outline' },
    { id: 'plus', name: 'RuDix Plus', price: 120.00, time: '14:30', icon: 'car-sport' },
    { id: 'taxi', name: 'Taxi Local', price: 70.00, time: '14:35', icon: 'bicycle' },
];

export default function SelectServiceScreen() {
    const router = useRouter();
    const { destination } = useLocalSearchParams<{ destination: string }>();
    const { colorScheme } = useColorScheme();
    const { location } = useLocation();
    const isDark = colorScheme === 'dark';
    const [selectedId, setSelectedId] = useState('eco');

    const handleConfirm = () => {
        router.push('/(passenger)/ride/tracking'); 
    };

    if (!location) {
        return <View style={styles.container}><ActivityIndicator /></View>
    }

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <Stack.Screen options={{ title: 'Elige tu viaje', headerShadowVisible: false }} />
            
            <View style={styles.mapContainer}>
                 <MapView 
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: location.coords.latitude, 
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                 >
                    <Marker coordinate={location.coords} />
                 </MapView>
                 
                 <TouchableOpacity style={[styles.backButton, isDark && styles.backButtonDark]} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
                 </TouchableOpacity>
            </View>

            <View style={[styles.bottomSheet, isDark && styles.bottomSheetDark]}>
                <Text style={[styles.destinationTitle, isDark && styles.textDark]}>Viaje a {destination}</Text>
                
                <FlatList
                    data={SERVICE_OPTIONS}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ marginVertical: Spacing.sm }}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[
                                styles.optionCard, 
                                isDark && styles.optionCardDark,
                                selectedId === item.id && styles.optionSelected
                            ]}
                            onPress={() => setSelectedId(item.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.optionLeft}>
                                <Ionicons name={item.icon as any} size={40} color={isDark ? Colors.dark.text : Colors.grey[800]} />
                                <View>
                                    <Text style={[styles.optionName, isDark && styles.textDark]}>{item.name}</Text>
                                    <Text style={[styles.optionTime, isDark && styles.textDarkSecondary]}>{item.time} • 4 min</Text>
                                </View>
                            </View>
                            <Text style={[styles.optionPrice, isDark && styles.textDark]}>${item.price.toFixed(2)}</Text>
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity style={styles.paymentRow} onPress={() => Toast.show({ type: 'info', text1: 'Próximamente' })}>
                    <Ionicons name="cash-outline" size={20} color={isDark ? Colors.dark.text : Colors.grey[800]} />
                    <Text style={[styles.paymentText, isDark && styles.textDark]}>Efectivo</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.grey[600]} />
                </TouchableOpacity>

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
    containerDark: { backgroundColor: Colors.dark.background },
    textDark: { color: Colors.dark.text },
    textDarkSecondary: { color: Colors.dark.textSecondary },
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
    backButtonDark: { backgroundColor: Colors.dark.surface },
    
    bottomSheet: { 
        backgroundColor: Colors.base.white, 
        borderTopLeftRadius: BorderRadius.xl, 
        borderTopRightRadius: BorderRadius.xl, 
        padding: Spacing.lg, 
        paddingBottom: Spacing.xl,
        ...Shadows.xl
    },
    bottomSheetDark: { backgroundColor: Colors.dark.background },
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
    optionCardDark: { backgroundColor: Colors.dark.surface, borderColor: Colors.dark.border },
    optionSelected: { 
      borderColor: Colors.brand.primary, 
      backgroundColor: hexWithOpacity(Colors.brand.primary, 0.1)
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
