import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import PhotoUploadBox from '@/components/driver/PhotoUploadBox';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [frontIne, setFrontIne] = useState<string>();
  const [backIne, setBackIne] = useState<string>();
  const [residence, setResidence] = useState<'yes' | 'no'>('yes');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.base.black} />
            </TouchableOpacity>
        </View>

        <Text style={styles.title}>Ingresa tu información personal y oficial</Text>
        
        <Text style={styles.sectionTitle}>Foto de tu INE</Text>
        <View style={styles.photosRow}>
            <PhotoUploadBox label="De Enfrente" imageUri={frontIne} onImageSelected={setFrontIne} />
            <PhotoUploadBox label="De Atrás" imageUri={backIne} onImageSelected={setBackIne} />
        </View>

        <TextInput style={styles.input} placeholder="Ingresa tu NSS (Número de Seguro Social)" placeholderTextColor={Colors.grey[500]} />

        <Text style={styles.question}>¿Resides actualmente en la dirección de tu INE?</Text>
        
        <TouchableOpacity style={styles.radioRow} onPress={() => setResidence('yes')}>
             <Text style={styles.radioLabel}>Sí</Text>
             <Ionicons name={residence === 'yes' ? "radio-button-on" : "radio-button-off"} size={24} color={Colors.brand.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioRow} onPress={() => setResidence('no')}>
             <View style={{flex: 1}}>
                <Text style={styles.radioLabel}>No, favor de ingresar un comprobante de domicilio.</Text>
             </View>
             <Ionicons name={residence === 'no' ? "radio-button-on" : "radio-button-off"} size={24} color={Colors.brand.primary} />
        </TouchableOpacity>

        {residence === 'no' && (
             <View style={{marginTop: 20, alignItems: 'center'}}>
                <PhotoUploadBox label="Comprobante de Domicilio" onImageSelected={() => {}} />
             </View>
        )}

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(driver)/register/license')}>
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
  input: { borderWidth: 1, borderColor: Colors.grey[300], borderRadius: 10, padding: 15, marginBottom: 30, backgroundColor: Colors.base.white },
  question: { fontSize: 16, fontWeight: 'bold', color: Colors.light.textSecondary, textAlign: 'center', marginBottom: 20 },
  radioRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.grey[200] },
  radioLabel: { color: Colors.light.textSecondary },
  footer: { padding: 20 },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});
