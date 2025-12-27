import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import PhotoUploadBox from '@/components/driver/PhotoUploadBox';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LicenseScreen() {
  const router = useRouter();
  const [licensePhoto, setLicensePhoto] = useState<string>();
  const [selfieLicense, setSelfieLicense] = useState<string>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Licencia de Conducir</Text>
        
        <Text style={styles.sectionTitle}>Foto de tu licencia de conducir</Text>
        <View style={styles.photosRow}>
            <PhotoUploadBox label="Foto de Licencia de conducir" imageUri={licensePhoto} onImageSelected={setLicensePhoto} />
            <PhotoUploadBox label="Selfie con tu Licencia" imageUri={selfieLicense} onImageSelected={setSelfieLicense} />
        </View>

        <Text style={styles.label}>Ingresa los siguientes datos:</Text>
        <TextInput style={styles.input} placeholder="Número de Licencia" />
        <TextInput style={styles.input} placeholder="Fecha de Expiración" />

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/driver/register/service-type')}>
            <Text style={styles.btnText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', textAlign: 'center', marginBottom: 15 },
  photosRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 15, marginBottom: 15, backgroundColor: '#fff' },
  footer: { padding: 20 },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});