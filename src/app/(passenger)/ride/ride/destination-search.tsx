import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Datos simulados de autocompletado
const MOCK_PLACES = [
  { id: '1', main: 'Aeropuerto Internacional CDMX', secondary: 'Av. Capitán Carlos León, Peñón de los Baños' },
  { id: '2', main: 'Plaza Carso', secondary: 'Lago Zurich 245, Ampliación Granada' },
  { id: '3', main: 'Ángel de la Independencia', secondary: 'Av. Paseo de la Reforma, Juárez' },
  { id: '4', main: 'Museo Soumaya', secondary: 'Blvd. Miguel de Cervantes Saavedra, Granada' },
];

export default function DestinationSearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSelectPlace = (place: typeof MOCK_PLACES[0]) => {
    // Navegar a la selección de servicio pasando el destino
    router.push({
      pathname: '/ride/select-service',
      params: { destination: place.main }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header de Búsqueda */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.grey[1400]} />
        </TouchableOpacity>
        
        <View style={styles.inputsContainer}>
            {/* Origen (Fijo por ahora) */}
            <View style={styles.inputRow}>
                <View style={[styles.dot, { backgroundColor: Colors.light.primary }]} />
                <TextInput 
                    style={styles.input} 
                    value="Ubicación actual" 
                    editable={false} 
                    placeholderTextColor={Colors.grey[800]}
                />
            </View>
            
            {/* Decorador de línea conectora */}
            <View style={styles.connector} />

            {/* Destino */}
            <View style={styles.inputRow}>
                <View style={[styles.dot, { backgroundColor: Colors.common.black }]} />
                <TextInput 
                    style={[styles.input, styles.inputActive]} 
                    placeholder="¿A dónde vas?" 
                    autoFocus={true}
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor={Colors.grey[800]}
                />
            </View>
        </View>
      </View>

      {/* Lista de Resultados */}
      <FlatList
        data={query.length > 0 ? MOCK_PLACES : []}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.placeItem} onPress={() => handleSelectPlace(item)}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={20} color={Colors.grey[1400]} />
            </View>
            <View>
              <Text style={styles.placeMain}>{item.main}</Text>
              <Text style={styles.placeSecondary}>{item.secondary}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 15, flexDirection: 'row', alignItems: 'flex-start', elevation: 4, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  backButton: { marginRight: 15, marginTop: 5 },
  inputsContainer: { flex: 1, gap: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[100], borderRadius: 8, paddingHorizontal: 10, height: 40 },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: Colors.grey[1400] },
  inputActive: { fontWeight: '500' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  connector: { position: 'absolute', left: 13, top: 28, width: 2, height: 24, backgroundColor: Colors.grey[400], zIndex: -1 },
  
  // Lista
  placeItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: Colors.grey[100] },
  iconContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.grey[200], alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  placeMain: { fontSize: 16, fontWeight: '600', color: Colors.grey[1400] },
  placeSecondary: { fontSize: 13, color: Colors.grey[900], marginTop: 2 },
});