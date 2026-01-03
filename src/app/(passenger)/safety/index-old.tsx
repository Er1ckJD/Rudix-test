import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SecurityScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const menuItems = [
    {
      id: 'contacts',
      icon: 'account-multiple-check-outline',
      title: 'Contactos de confianza',
      subtitle: 'Comparte el estado de tu viaje con amigos o familiares.',
      route: '/safety/emergency-contacts', // Asegúrate de crear este archivo o ajustar la ruta
      color: '#000'
    },
    {
      id: 'pin',
      icon: 'dialpad',
      title: 'Verificar mi viaje',
      subtitle: 'Usa un código PIN para asegurarte de que subes al auto correcto.',
      route: '/safety/verify-trip',
      color: '#000'
    },
    {
      id: 'audio',
      icon: 'microphone-outline',
      title: 'Grabación de audio',
      subtitle: 'Graba audio durante tu viaje si te sientes incómodo.',
      route: '/safety/audio-recording',
      color: '#000'
    },
    {
      id: '911',
      icon: 'police-badge-outline',
      title: 'Llamar al 911',
      subtitle: 'Asistencia inmediata de las autoridades locales.',
      route: null,
      action: () => alert('Llamando al 911...'),
      color: '#E53935' // Rojo para emergencia
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleOpenDrawer} style={styles.menuButton}>
          <MaterialCommunityIcons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguridad</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <MaterialCommunityIcons name="shield-check" size={80} color="#276EF1" />
          <Text style={styles.heroTitle}>Tu seguridad es nuestra prioridad</Text>
          <Text style={styles.heroSubtitle}>
            Configura estas herramientas para viajar con mayor tranquilidad.
          </Text>
        </View>

        {/* Menu List */}
        <View style={styles.listContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => item.route ? router.push(item.route) : item.action?.()}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color === '#E53935' ? '#FFEBEE' : '#F5F5F5' }]}>
                <MaterialCommunityIcons name={item.icon} size={26} color={item.color} />
              </View>
              
              <View style={styles.itemTextContainer}>
                <Text style={[styles.itemTitle, { color: item.color }]}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>

              <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  content: { paddingBottom: 40 },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
});