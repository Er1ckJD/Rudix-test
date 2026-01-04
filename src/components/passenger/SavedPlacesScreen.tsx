import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const SAVED_PLACES = [
    { id: '1', title: 'Casa', address: 'Habaneras 61, Virginia', icon: 'home' },
    { id: '2', title: 'Oficina', address: 'Reforma 222, CDMX', icon: 'briefcase' },
    { id: '3', title: 'Gym', address: 'SmartFit Universidad', icon: 'barbell' },
];

export default function SavedPlacesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: 'Lugares Guardados', headerShadowVisible: false }} />
            
            <FlatList
                data={SAVED_PLACES}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                ListHeaderComponent={() => (
                    <TouchableOpacity style={styles.addButton}>
                        <View style={styles.addIcon}>
                            <Ionicons name="add" size={24} color="#fff" />
                        </View>
                        <Text style={styles.addText}>Agregar un lugar nuevo</Text>
                    </TouchableOpacity>
                )}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.iconBox}>
                            <Ionicons name={item.icon as any} size={20} color={Colors.grey[1200]} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemAddress}>{item.address}</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="pencil-outline" size={20} color={Colors.light.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 15 }}>
                            <Ionicons name="trash-outline" size={20} color={Colors.common.error} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    addButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
    addIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    addText: { color: Colors.light.primary, fontWeight: 'bold', fontSize: 16 },
    itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: Colors.grey[100] },
    iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.grey[100], alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    itemTitle: { fontWeight: 'bold', fontSize: 16, color: Colors.grey[1400] },
    itemAddress: { color: Colors.grey[900], fontSize: 13, marginTop: 2 },
});