import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSubmit = () => {
    // Aquí enviarías la calificación al backend
    console.log(`Rating: ${rating}, Comment: ${comment}`);
    router.replace('/(passenger)/(home)'); // Volver al Home limpio
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
        
        <View style={styles.content}>
            <Text style={styles.title}>¡Llegaste a tu destino!</Text>
            <Text style={[styles.subtitle, isDark && styles.textDarkSecondary]}>¿Cómo estuvo tu viaje con Carlos?</Text>

            <View style={styles.driverContainer}>
                {/* Reemplazar con componente de Avatar si se crea */}
                <View style={[styles.avatar, isDark && styles.avatarDark]}>
                    <Text style={styles.avatarText}>C</Text>
                </View>
                <Text style={[styles.driverName, isDark && styles.textDark]}>Carlos Mendoza</Text>
                <Text style={[styles.carInfo, isDark && styles.textDarkSecondary]}>Nissan Versa • 723-AZW</Text>
            </View>

            {/* Estrellas */}
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons 
                            name={star <= rating ? "star" : "star-outline"} 
                            size={40} 
                            color={Colors.semantic.warning} 
                            style={{ marginHorizontal: Spacing.xs }}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.ratingLabel}>
                {rating === 5 ? '¡Excelente!' : rating >= 4 ? 'Muy bien' : rating > 0 ? 'Podría mejorar' : 'Toca una estrella'}
            </Text>

            {/* Comentario */}
            <Input
                placeholder="Escribe un comentario (opcional)..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                style={styles.input}
            />
        </View>

        <View style={[styles.footer, isDark && styles.footerDark]}>
            <Button 
                title="Enviar Calificación" 
                onPress={handleSubmit} 
                disabled={rating === 0}
                fullWidth
                gradient
            />
            <Button
              title="Omitir"
              variant="ghost"
              onPress={() => router.replace('/(passenger)/(home)')}
              style={{ marginTop: Spacing.sm }}
            />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.base.white 
  },
  containerDark: { backgroundColor: Colors.dark.background },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: { 
    alignItems: 'center', 
    paddingHorizontal: Spacing.lg, 
    paddingTop: Spacing.xl 
  },
  title: { 
    fontSize: Typography.size.xxl, 
    fontWeight: Typography.weight.bold, 
    color: Colors.brand.primary, 
    marginBottom: Spacing.sm 
  },
  subtitle: { 
    fontSize: Typography.size.md, 
    color: Colors.grey[600], 
    marginBottom: Spacing.xl, 
    textAlign: 'center' 
  },
  textDark: { color: Colors.dark.text },
  textDarkSecondary: { color: Colors.dark.textSecondary },
  
  driverContainer: { 
    alignItems: 'center', 
    marginBottom: Spacing.xl 
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginBottom: Spacing.md,
    backgroundColor: Colors.grey[200],
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarDark: { backgroundColor: Colors.grey[800] },
  avatarText: {
    fontSize: Typography.size.xxxl,
    color: Colors.brand.primary,
    fontWeight: Typography.weight.bold,
  },
  driverName: { 
    fontSize: Typography.size.lg, 
    fontWeight: Typography.weight.bold, 
    color: Colors.light.text
  },
  carInfo: { 
    fontSize: Typography.size.base, 
    color: Colors.grey[600],
    marginTop: Spacing.xs,
  },

  starsContainer: { 
    flexDirection: 'row', 
    marginBottom: Spacing.sm 
  },
  ratingLabel: { 
    fontSize: Typography.size.md, 
    fontWeight: Typography.weight.semibold, 
    color: Colors.semantic.warning, 
    marginBottom: Spacing.xl 
  },

  input: { 
    height: 120,
    textAlignVertical: 'top',
  },

  footer: { 
    padding: Spacing.lg, 
    borderTopWidth: 1, 
    borderTopColor: Colors.grey[100] 
  },
  footerDark: {
    borderTopColor: Colors.dark.border,
  }
});
