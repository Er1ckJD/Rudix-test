import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '@/components/ui/AuthButton';

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Aquí enviarías la calificación al backend
    router.replace('/'); // Volver al Home limpio
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        
        <View style={styles.content}>
            <Text style={styles.title}>¡Llegaste a tu destino!</Text>
            <Text style={styles.subtitle}>¿Cómo estuvo tu viaje con Carlos?</Text>

            <View style={styles.driverContainer}>
                <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                    style={styles.avatar} 
                />
                <Text style={styles.driverName}>Carlos Mendoza</Text>
                <Text style={styles.carInfo}>Nissan Versa • 723-AZW</Text>
            </View>

            {/* Estrellas */}
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons 
                            name={star <= rating ? "star" : "star-outline"} 
                            size={40} 
                            color={Colors.common.gold} 
                            style={{ marginHorizontal: 5 }}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.ratingLabel}>
                {rating === 5 ? '¡Excelente!' : rating > 3 ? 'Muy bien' : rating > 0 ? 'Podría mejorar' : 'Toca una estrella'}
            </Text>

            {/* Comentario */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un comentario (opcional)..."
                    placeholderTextColor={Colors.grey[800]}
                    multiline
                    numberOfLines={4}
                    value={comment}
                    onChangeText={setComment}
                />
            </View>
        </View>

        <View style={styles.footer}>
            <AuthButton 
                title="Enviar Calificación" 
                onPress={handleSubmit} 
                disabled={rating === 0} // Deshabilitado si no ha seleccionado estrellas
                style={rating === 0 ? { opacity: 0.5 } : {}}
            />
            <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/')}>
                <Text style={styles.skipText}>Omitir</Text>
            </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 30, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 10 },
  subtitle: { fontSize: 16, color: Colors.grey[1100], marginBottom: 30, textAlign: 'center' },
  
  driverContainer: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  driverName: { fontSize: 18, fontWeight: 'bold', color: Colors.grey[1400] },
  carInfo: { fontSize: 14, color: Colors.grey[900] },

  starsContainer: { flexDirection: 'row', marginBottom: 10 },
  ratingLabel: { fontSize: 16, fontWeight: '600', color: Colors.common.gold, marginBottom: 40 },

  inputContainer: { width: '100%', backgroundColor: Colors.grey[100], borderRadius: 15, padding: 15 },
  input: { fontSize: 16, color: Colors.grey[1400], textAlignVertical: 'top', height: 100 },

  footer: { padding: 30, borderTopWidth: 1, borderTopColor: Colors.grey[100] },
  skipBtn: { alignItems: 'center', marginTop: 15 },
  skipText: { color: Colors.grey[900], fontSize: 14 }
});