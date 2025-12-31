import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContractScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contrato de Trabajo</Text>
      
      <Text style={styles.legalText}>
          Al hacer clic en aceptar, aceptas y estas de acuerdo con los 
          <Text style={{fontWeight: 'bold'}}> terminos del contrato</Text>
      </Text>
      
      <TouchableOpacity>
        <Text style={styles.link}>Términos y condiciones del contrato</Text>
      </TouchableOpacity>

      <Image 
        source={require('@/assets/images/react-logo.png')} // Coche verde
        style={styles.image} 
        contentFit="contain" 
      />

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/driver/register/notifications')}>
            <Text style={styles.btnText}>Acepto contrato</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 20 },
  legalText: { textAlign: 'center', color: '#666', fontSize: 16, marginBottom: 5 },
  link: { color: Colors.light.tint, fontSize: 12, marginBottom: 50 },
  image: { width: '80%', height: 150, marginBottom: 50 },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});