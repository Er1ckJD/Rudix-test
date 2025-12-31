import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';

// Datos de ejemplo basados en tu imagen
const initialContacts = [
  { id: '1', name: 'Nombre y Apellido', phone: '3310482809' },
  { id: '2', name: 'Nombre y Apellido', phone: '3310482809' },
];

const EmergencyContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState(initialContacts);

  // Funciones manejadoras (placeholders para la lógica real)
  const handleGoBack = () => {
    // navigation.goBack();
    console.log('Regresar');
  };

  const handleAddContact = async () => {
    if (contacts.length >= 3) {
      Alert.alert('Límite alcanzado', 'Solo puedes agregar hasta 3 contactos.');
      return;
    }

    try {
      // 1. Pedir permisos
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status === 'granted') {
        // 2. Abrir la agenda nativa del celular
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });

        // Nota: En un caso real, usarías una UI para seleccionar uno específico.
        // Como `getContactsAsync` trae TODOS, lo mejor es navegar a una pantalla de selección 
        // o usar un modal simple si son pocos.
        
        // PERO, una forma más directa en React Native (si quieres abrir el selector nativo de un solo contacto)
        // a veces requiere librerías extra o lógica custom. 
        // Para simplificar, aquí simulamos que seleccionaste el primero O 
        // podrías mostrar un Modal con la lista `data` filtrada.
        
        // SIMULACIÓN DE SELECCIÓN (Para que veas que funciona):
        if (data.length > 0) {
          const contact = data[0]; // Tomamos el primero como ejemplo
          const newContact = {
              id: contact.id || Date.now().toString(),
              name: contact.name || 'Sin nombre',
              phone: contact.phoneNumbers?.[0]?.number || 'Sin número'
          };
          
          setContacts([...contacts, newContact]);
          Alert.alert('Éxito', `${newContact.name} agregado correctamente.`);
        } else {
          Alert.alert('Sin contactos', 'No se encontraron contactos en tu agenda.');
        }
      } else {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tus contactos para esta función.');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Hubo un problema al abrir los contactos.');
    }
  };

  const handleContactOptions = (contactId) => {
    // Aquí abrirías un ActionSheet o Modal para Editar/Eliminar
    Alert.alert('Opciones', `Opciones para el contacto ${contactId}`);
  };

  // Función para renderizar cada fila de contacto
  const renderContactItem = ({ item }) => (
    <View style={styles.contactRow}>
      {/* Icono izquierdo (Escudo/Placeholder) */}
      <View style={styles.contactIconContainer}>
        <MaterialCommunityIcons name="shield-account" size={24} color="#666" />
      </View>

      {/* Información del contacto */}
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>

      {/* Botón de opciones (tres puntos) */}
      <TouchableOpacity
        style={styles.optionsButton}
        onPress={() => handleContactOptions(item.id)}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#000" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Contactos de emergencia</Text>
          
          <TouchableOpacity onPress={handleAddContact} style={styles.headerButton}>
            <MaterialCommunityIcons name="plus" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        {/* --- Texto descriptivo --- */}
        <Text style={styles.descriptionText}>
          Puedes agregar hasta tres contactos para que podamos comunicarnos en caso de emergencia.
        </Text>

        {/* --- Lista de Contactos --- */}
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContactItem}
          contentContainerStyle={styles.listContent}
          // Línea separadora opcional entre items
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Una línea sutil debajo del header
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  // Description Text Styles
  descriptionText: {
    fontSize: 15,
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 20,
    lineHeight: 22,
  },
  // List Styles
  listContent: {
    paddingBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0', // Un fondo gris claro para el icono
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfoContainer: {
    flex: 1, // Toma el espacio disponible central
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#888',
  },
  optionsButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 76, // Opcional: sangría para que la línea no empiece desde el borde izquierdo
  }
});

export default EmergencyContactsScreen;