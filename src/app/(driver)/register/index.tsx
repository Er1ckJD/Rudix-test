import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DriverWelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.base.black} />
            </TouchableOpacity>
        </View>

        <Text style={styles.title}>Únete a nuestro{'\n'}Equipo de{'\n'}conductores RuDix</Text>
        
        {/* Reemplaza con tu imagen de coche de F1 verde */}
        <Image 
            source={require('@/assets/images/react-logo.png')} 
            style={styles.heroImage} 
            contentFit="contain"
        />

        <View style={styles.card}>
            <Text style={styles.cardIcon}>%</Text>
            <Text style={styles.cardText}>La app de viajes con las comisiones más bajas para tus viajes</Text>
        </View>

        <View style={styles.card}>
            <Ionicons name="time-outline" size={24} color={Colors.light.textSecondary} />
            <Text style={styles.cardText}>Donde tu elijes tu propio horario laboral</Text>
        </View>

        <View style={styles.card}>
            <Ionicons name="card-outline" size={24} color={Colors.light.textSecondary} />
            <Text style={styles.cardText}>Genera más ingreso que cualquier otra plataforma</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(driver)/register/personal-info')}>
            <Text style={styles.btnText}>Únete</Text>
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
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.brand.primary, textAlign: 'center', marginBottom: 30 },
  heroImage: { width: '100%', height: 150, marginBottom: 30 },
  card: { 
    flexDirection: 'column', alignItems: 'center', backgroundColor: Colors.base.white, 
    padding: 15, borderRadius: 15, marginBottom: 15,
    ...Shadows.md
  },
  cardIcon: { fontSize: 24, fontWeight: 'bold', color: Colors.light.textSecondary },
  cardText: { textAlign: 'center', color: Colors.light.textSecondary, marginTop: 5, fontSize: 13 },
  footer: { padding: 20 },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});
