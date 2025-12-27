import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function SecurityScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 1. Cabecera con Imagen de Fondo */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} // Imagen placeholder de mujer en coche
        style={styles.headerImage}
      >
        <SafeAreaView style={styles.headerOverlay}>
          {/* Botón Menú Hamburguesa */}
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>

          {/* Texto Cabecera */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Seguridad</Text>
            <Text style={styles.headerSubtitle}>
              Tu seguridad nos importa y con RuDix la confianza está de tu lado
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* 2. Panel Blanco Principal */}
      <ScrollView 
        style={styles.contentContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Funciones de Seguridad</Text>

        {/* Tarjeta: Contacto de Emergencia */}
        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Ionicons name="people-outline" size={24} color="#555" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Contacto de emergencia</Text>
            <Text style={styles.cardSubtitle}>Comparte datos del viaje automáticamente</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta: Soporte */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIconContainer}>
            <MaterialCommunityIcons name="message-outline" size={24} color="#006d77" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Soporte</Text>
          </View>
        </TouchableOpacity>

        {/* Botón Grande: Llamar 911 */}
        <TouchableOpacity style={styles.sosButton}>
          <MaterialCommunityIcons name="alarm-light-outline" size={32} color="#FFF" />
          <Text style={styles.sosButtonText}>Llamar 911</Text>
        </TouchableOpacity>

        {/* Sección: Cómo estás protegido */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Cómo estás protegido con RuDix
        </Text>

        <View style={styles.gridContainer}>
          {/* Grid Item 1 */}
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="eye-outline" size={24} color="#007bff" />
            <Text style={styles.gridText}>Antes de subir al vehículo</Text>
          </TouchableOpacity>

          {/* Grid Item 2 */}
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="location-outline" size={24} color="#28a745" />
            <Text style={styles.gridText}>Durante el viaje</Text>
          </TouchableOpacity>

          {/* Grid Item 3 */}
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="alert-circle-outline" size={24} color="#dc3545" />
            <Text style={styles.gridText}>En situaciones de riesgo</Text>
          </TouchableOpacity>

          {/* Grid Item 4 */}
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="star-outline" size={24} color="#9b59b6" />
            <Text style={styles.gridText}>Al finalizar el viaje</Text>
          </TouchableOpacity>
        </View>

        {/* Botón Inferior: Accidentes */}
        <TouchableOpacity style={styles.bottomButton}>
          <Ionicons name="notifications-outline" size={20} color="#e67e22" />
          <Text style={styles.bottomButtonText}>Accidentes: pasos a seguir</Text>
        </TouchableOpacity>

        {/* Logo Footer */}
        <View style={styles.footerLogo}>
           <Text style={styles.logoText}>RuDix</Text>
           <MaterialCommunityIcons name="car-hatchback" size={20} color="#555" />
        </View>
        
        {/* Espacio extra para scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro detrás de la imagen
  },
  headerImage: {
    height: 300, // Altura de la imagen de fondo
    justifyContent: 'flex-start',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Oscurecer ligeramente la imagen
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuButton: {
    backgroundColor: '#FFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTextContainer: {
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 20,
    width: '80%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: -40, // Efecto de solapamiento sobre la imagen
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardIconContainer: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#bde0fe',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 12,
    color: '#0077b6',
    fontWeight: 'bold',
  },
  sosButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 20,
    // Sombras
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sosButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    // Sombras suaves
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  gridText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
    fontWeight: '500',
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  }
});