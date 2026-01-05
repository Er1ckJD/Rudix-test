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
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.base.black} />
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>Licencia de Conducir</Text>
        
        <Text style={styles.sectionTitle}>Foto de tu licencia de conducir</Text>
        <View style={styles.photosRow}>
            <PhotoUploadBox label="Foto de Licencia de conducir" imageUri={licensePhoto} onImageSelected={setLicensePhoto} />
            <PhotoUploadBox label="Selfie con tu Licencia" imageUri={selfieLicense} onImageSelected={setSelfieLicense} />
        </View>

        <Text style={styles.label}>Ingresa los siguientes datos:</Text>
        <TextInput style={styles.input} placeholder="Número de Licencia" placeholderTextColor={Colors.grey[500]} />
        <TextInput style={styles.input} placeholder="Fecha de Expiración" placeholderTextColor={Colors.grey[500]} />

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(driver)/register/service-type')}>
            <Text style={styles.btnText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.base.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white },
  scroll: { padding: 20 },
  header: { alignItems: 'flex-start', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.brand.primary, textAlign: 'center', marginBottom: 30 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.light.textSecondary, textAlign: 'center', marginBottom: 15 },
  photosRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 },
  label: { fontSize: 14, fontWeight: 'bold', color: Colors.light.textSecondary, marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: Colors.grey[300], borderRadius: 10, padding: 15, marginBottom: 15, backgroundColor: Colors.base.white },
  footer: { padding: 20 },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});