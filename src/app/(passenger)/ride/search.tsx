import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSelectPlace = (place: typeof MOCK_PLACES[0]) => {
    // Navegar a la selección de servicio pasando el destino
    router.push({
      pathname: '/(passenger)/ride/select-service',
      params: { destination: place.main }
    });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header de Búsqueda */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
        
        <View style={styles.inputsContainer}>
            {/* Origen (Fijo por ahora) */}
            <View style={[styles.inputRow, isDark && styles.inputRowDark]}>
                <View style={[styles.dot, { backgroundColor: Colors.brand.primary }]} />
                <TextInput 
                    style={[styles.input, isDark && styles.inputDark]} 
                    value="Ubicación actual" 
                    editable={false} 
                    placeholderTextColor={Colors.grey[500]}
                />
            </View>
            
            {/* Decorador de línea conectora */}
            <View style={styles.connector} />

            {/* Destino */}
            <View style={[styles.inputRow, isDark && styles.inputRowDark]}>
                <View style={[styles.dot, { backgroundColor: isDark ? Colors.dark.text : Colors.light.text }]} />
                <TextInput 
                    style={[styles.input, styles.inputActive, isDark && styles.inputDark]} 
                    placeholder="¿A dónde vas?" 
                    autoFocus={true}
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor={Colors.grey[500]}
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
          <TouchableOpacity style={[styles.placeItem, isDark && styles.placeItemDark]} onPress={() => handleSelectPlace(item)}>
            <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
              <Ionicons name="location" size={20} color={isDark ? Colors.dark.text : Colors.light.text} />
            </View>
            <View>
              <Text style={[styles.placeMain, isDark && styles.placeMainDark]}>{item.main}</Text>
              <Text style={[styles.placeSecondary, isDark && styles.placeSecondaryDark]}>{item.secondary}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white },
  containerDark: { backgroundColor: Colors.dark.background },
  header: { padding: 15, flexDirection: 'row', alignItems: 'flex-start', elevation: 4, backgroundColor: Colors.base.white, shadowColor: Colors.base.black, shadowOpacity: 0.1, shadowRadius: 5 },
  headerDark: { backgroundColor: Colors.dark.surface, borderBottomWidth: 1, borderBottomColor: Colors.dark.border },
  backButton: { marginRight: 15, marginTop: 5 },
  inputsContainer: { flex: 1, gap: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[100], borderRadius: 8, paddingHorizontal: 10, height: 40 },
  inputRowDark: { backgroundColor: Colors.dark.surface },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: Colors.light.text },
  inputDark: { color: Colors.dark.text },
  inputActive: { fontWeight: '500' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  connector: { position: 'absolute', left: 13, top: 28, width: 2, height: 24, backgroundColor: Colors.grey[400], zIndex: -1 },
  
  // Lista
  placeItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: Colors.grey[100] },
  placeItemDark: { borderBottomColor: Colors.dark.border },
  iconContainer: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.grey[200], alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  iconContainerDark: { backgroundColor: Colors.dark.surface },
  placeMain: { fontSize: 16, fontWeight: '600', color: Colors.light.text },
  placeMainDark: { color: Colors.dark.text },
  placeSecondary: { fontSize: 13, color: Colors.grey[600], marginTop: 2 },
  placeSecondaryDark: { color: Colors.grey[400] },
});