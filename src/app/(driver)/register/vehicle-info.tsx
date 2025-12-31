import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import PhotoUploadBox from '@/components/driver/PhotoUploadBox';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VehicleInfoScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>(); // 'standard' o 'lux'
  const isLux = type === 'lux';
  
  const [carPhoto, setCarPhoto] = useState<string>();
  const [extraPhoto, setExtraPhoto] = useState<string>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
            Ingresa la Información de tu Vehículo {isLux ? 'Lux' : ''}
        </Text>
        
        <Text style={styles.sectionTitle}>Foto del Vehículo {isLux ? 'Lux' : ''}</Text>
        <View style={styles.photosRow}>
            <PhotoUploadBox label="Foto del Vehículo" imageUri={carPhoto} onImageSelected={setCarPhoto} />
            <PhotoUploadBox label="Otra (Opcional)" imageUri={extraPhoto} onImageSelected={setExtraPhoto} />
        </View>

        <Text style={styles.label}>Ingresa los datos de tu Vehículo:</Text>
        
        <TextInput style={styles.input} placeholder="Marca del Vehículo" />
        <TextInput style={styles.input} placeholder="Modelo del vehículo" />
        <TextInput style={styles.input} placeholder="Color del vehículo" />
        <TextInput style={styles.input} placeholder={`Año de fabricación (no menor del año ${isLux ? '2022' : '2017'})`} />
        <TextInput style={styles.input} placeholder="Número de Placa" />
        <TextInput style={styles.input} placeholder="Número de Póliza de seguro (opcional)" />

        {/* Imagen del cochecito abajo */}
        <View style={{alignItems: 'center', marginTop: 10}}>
             {/* Usa tu imagen de coche verde */}
             <Image source={require('@/assets/images/react-logo.png')} style={{width: 50, height: 30}} contentFit="contain"/>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/driver/register/almost-there')}>
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
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', textAlign: 'center', marginBottom: 15 },
  photosRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10, backgroundColor: '#fff', fontSize: 12 },
  footer: { padding: 20 },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});