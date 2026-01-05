import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, Typography, hexWithOpacity } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';

export default function ProfileScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { logout, user } = useAuth();
  const isDark = colorScheme === 'dark';
  const [isEditing, setIsEditing] = useState(false);
  
  // Datos simulados (esto vendría de tu backend/hook de auth)
  const [userData, setUserData] = useState({
    name: user?.nombres + ' ' + user?.apellidos || 'Edgar Alessandro',
    email: user?.email || 'edgar.alex@gmail.com',
    phone: user?.telefono || '+52 55 1234 5678',
    avatar: user?.photoUrl || 'https://randomuser.me/api/portraits/men/32.jpg',
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
    Toast.show({
        type: 'success',
        text1: 'Perfil Actualizado',
        text2: 'Tus datos se han guardado correctamente.',
    });
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen 
        options={{ 
          title: 'Mi Perfil', 
          headerShadowVisible: false,
          headerStyle: { backgroundColor: isDark ? Colors.dark.background : Colors.base.white },
          headerTintColor: isDark ? Colors.dark.text : Colors.light.text,
          headerRight: () => (
            <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
              <Text style={{ color: Colors.brand.primary, fontWeight: 'bold', fontSize: 16 }}>
                {isEditing ? 'Guardar' : 'Editar'}
              </Text>
            </TouchableOpacity>
          )
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={pickImage} activeOpacity={isEditing ? 0.7 : 1}>
                <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                {isEditing && (
                    <View style={styles.editBadge}>
                        <Ionicons name="camera" size={16} color={Colors.base.white} />
                    </View>
                )}
            </TouchableOpacity>
            
            <Text style={[styles.userName, isDark && styles.textDark]}>{userData.name}</Text>
            <View style={[styles.ratingContainer, isDark && styles.ratingContainerDark]}>
                <Ionicons name="star" size={16} color={Colors.common.gold} />
                <Text style={[styles.ratingText, isDark && styles.ratingTextDark]}>4.95 (Usuario Top)</Text>
            </View>
        </View>

        <View style={[styles.statsRow, isDark && styles.statsRowDark]}>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>124</Text>
                <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Viajes</Text>
            </View>
            <View style={[styles.verticalLine, isDark && styles.verticalLineDark]} />
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>2</Text>
                <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Años</Text>
            </View>
            <View style={[styles.verticalLine, isDark && styles.verticalLineDark]} />
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>Oro</Text>
                <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Nivel</Text>
            </View>
        </View>

        <View style={styles.formContainer}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Información Personal</Text>
            
            <View style={styles.inputGroup}>
                <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Nombre Completo</Text>
                <TextInput 
                    style={[styles.input, isDark && styles.inputDark, !isEditing && styles.inputDisabled]}
                    value={userData.name}
                    onChangeText={(t) => setUserData({...userData, name: t})}
                    editable={isEditing}
                    placeholderTextColor={Colors.grey[500]}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Correo Electrónico</Text>
                <TextInput 
                    style={[styles.input, isDark && styles.inputDark, !isEditing && styles.inputDisabled]}
                    value={userData.email}
                    onChangeText={(t) => setUserData({...userData, email: t})}
                    editable={isEditing}
                    keyboardType="email-address"
                    placeholderTextColor={Colors.grey[500]}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Teléfono</Text>
                <TextInput 
                    style={[styles.input, isDark && styles.inputDark, !isEditing && styles.inputDisabled]}
                    value={userData.phone}
                    onChangeText={(t) => setUserData({...userData, phone: t})}
                    editable={isEditing}
                    keyboardType="phone-pad"
                    placeholderTextColor={Colors.grey[500]}
                />
            </View>
        </View>

        <TouchableOpacity style={[styles.logoutBtn, isDark && styles.logoutBtnDark]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.semantic.error} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, isDark && styles.textDarkSecondary]}>Versión 1.0.5 (Build 2025)</Text>
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white },
  containerDark: { backgroundColor: Colors.dark.background },
  textDark: { color: Colors.dark.text },
  textDarkSecondary: { color: Colors.dark.textSecondary },
  headerContainer: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: Colors.grey[300] },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.brand.primary, padding: 8, borderRadius: 20, borderWidth: 2, borderColor: Colors.base.white },
  userName: { fontSize: 22, fontWeight: 'bold', marginTop: 15, color: Colors.light.text },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5, backgroundColor: hexWithOpacity(Colors.common.gold, 0.1), paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  ratingContainerDark: { backgroundColor: hexWithOpacity(Colors.common.gold, 0.2) },
  ratingText: { fontWeight: 'bold', color: Colors.common.darkGold, marginLeft: 5 },
  ratingTextDark: { color: Colors.common.gold },

  statsRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20, marginHorizontal: 20, padding: 15, backgroundColor: Colors.grey[50], borderRadius: 15 },
  statsRowDark: { backgroundColor: Colors.dark.surface },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: Colors.brand.primary },
  statLabel: { fontSize: 12, color: Colors.grey[600] },
  statLabelDark: { color: Colors.grey[400] },
  verticalLine: { width: 1, height: '100%', backgroundColor: Colors.grey[300] },
  verticalLineDark: { backgroundColor: Colors.grey[700] },

  formContainer: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, color: Colors.grey[600], marginBottom: 5, marginLeft: 2 },
  input: { backgroundColor: Colors.grey[100], borderRadius: 10, padding: 12, fontSize: 16, color: Colors.light.text, borderWidth: 1, borderColor: 'transparent' },
  inputDark: { backgroundColor: Colors.dark.surface, color: Colors.dark.text },
  inputDisabled: { color: Colors.grey[500], backgroundColor: 'transparent', borderColor: Colors.grey[300] },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, padding: 15, marginHorizontal: 20, borderRadius: 12, backgroundColor: hexWithOpacity(Colors.semantic.error, 0.1) },
  logoutBtnDark: { backgroundColor: hexWithOpacity(Colors.semantic.error, 0.2) },
  logoutText: { color: Colors.semantic.error, fontWeight: 'bold', marginLeft: 10 },
  versionText: { textAlign: 'center', color: Colors.grey[500], fontSize: 12, marginTop: 20 },
});