import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/theme';

interface PhotoUploadBoxProps {
  label: string;
  imageUri?: string;
  onImageSelected: (uri: string) => void;
}

export default function PhotoUploadBox({ label, imageUri, onImageSelected }: PhotoUploadBoxProps) {
  
  const pickImage = async () => {
    // Pedir permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Necesitamos permisos para acceder a tus fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Ionicons name="add-circle-outline" size={40} color={Colors.light.primary} />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '45%' },
  box: {
    width: '100%',
    aspectRatio: 1, // Cuadrado
    backgroundColor: Colors.common.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Sombra Android
    shadowColor: Colors.common.black, // Sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
    overflow: 'hidden'
  },
  image: { width: '100%', height: '100%' },
  label: { fontSize: 12, color: Colors.grey[1100], textAlign: 'center' },
});