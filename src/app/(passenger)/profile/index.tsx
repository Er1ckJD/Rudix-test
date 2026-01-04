import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Datos simulados (esto vendría de tu backend/hook de auth)
  const [userData, setUserData] = useState({
    name: 'Edgar Alessandro',
    email: 'edgar.alex@gmail.com',
    phone: '+52 55 1234 5678',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  });

  const pickImage = async () => {
    if (!isEditing) return;
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUserData({ ...userData, avatar: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar en backend
    Alert.alert('Perfil Actualizado', 'Tus datos se han guardado correctamente.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Mi Perfil', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.common.white },
          headerTintColor: Colors.grey[1400],
          headerRight: () => (
            <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
              <Text style={{ color: Colors.light.primary, fontWeight: 'bold', fontSize: 16 }}>
                {isEditing ? 'Guardar' : 'Editar'}
              </Text>
            </TouchableOpacity>
          )
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER: Avatar y Resumen */}
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={pickImage} activeOpacity={isEditing ? 0.7 : 1}>
                <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                {isEditing && (
                    <View style={styles.editBadge}>
                        <Ionicons name="camera" size={16} color={Colors.common.white} />
                    </View>
                )}
            </TouchableOpacity>
            
            <Text style={styles.userName}>{userData.name}</Text>
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={Colors.common.gold} />
                <Text style={styles.ratingText}>4.95 (Usuario Top)</Text>
            </View>
        </View>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <View style={styles.statsRow}>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>124</Text>
                <Text style={styles.statLabel}>Viajes</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={styles.statLabel}>Años</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>Oro</Text>
                <Text style={styles.statLabel}>Nivel</Text>
            </View>
        </View>

        {/* FORMULARIO DE DATOS */}
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre Completo</Text>
                <TextInput 
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={userData.name}
                    onChangeText={(t) => setUserData({...userData, name: t})}
                    editable={isEditing}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput 
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={userData.email}
                    onChangeText={(t) => setUserData({...userData, email: t})}
                    editable={isEditing}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Teléfono</Text>
                <TextInput 
                    style={[styles.input, !isEditing && styles.inputDisabled]}
                    value={userData.phone}
                    onChangeText={(t) => setUserData({...userData, phone: t})}
                    editable={isEditing}
                    keyboardType="phone-pad"
                />
            </View>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/auth')}>
            <Ionicons name="log-out-outline" size={20} color={Colors.common.error} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versión 1.0.5 (Build 2025)</Text>
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.common.white },
  headerContainer: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: Colors.grey[300] },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.light.primary, padding: 8, borderRadius: 20, borderWidth: 2, borderColor: Colors.common.white },
  userName: { fontSize: 22, fontWeight: 'bold', marginTop: 15, color: Colors.grey[1400] },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5, backgroundColor: Colors.common.lightGold, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  ratingText: { fontWeight: 'bold', color: Colors.common.darkGold, marginLeft: 5 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20, marginHorizontal: 20, padding: 15, backgroundColor: Colors.grey[50], borderRadius: 15 },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: Colors.light.primary },
  statLabel: { fontSize: 12, color: Colors.grey[1100] },
  verticalLine: { width: 1, height: '100%', backgroundColor: Colors.grey[450] },

  formContainer: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.grey[1400], marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, color: Colors.grey[1100], marginBottom: 5, marginLeft: 2 },
  input: { backgroundColor: Colors.grey[250], borderRadius: 10, padding: 12, fontSize: 16, color: Colors.grey[1400], borderWidth: 1, borderColor: 'transparent' },
  inputDisabled: { color: Colors.grey[1100], backgroundColor: Colors.common.white, borderColor: Colors.grey[450] },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, padding: 15, marginHorizontal: 20, borderRadius: 12, backgroundColor: Colors.common.lightRed },
  logoutText: { color: Colors.common.error, fontWeight: 'bold', marginLeft: 10 },
  versionText: { textAlign: 'center', color: Colors.grey[950], fontSize: 12, marginTop: 20 },
});