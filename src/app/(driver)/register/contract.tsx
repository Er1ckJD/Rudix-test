import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContractScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.base.black} />
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
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
        </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(driver)/register/notifications')}>
                <Text style={styles.btnText}>Acepto contrato</Text>
                <Ionicons name="arrow-forward" size={20} color={Colors.base.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white, padding: 30 },
  header: { width: '100%', alignItems: 'flex-start' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.brand.primary, marginBottom: 20 },
  legalText: { textAlign: 'center', color: Colors.light.textSecondary, fontSize: 16, marginBottom: 5 },
  link: { color: Colors.brand.accent, fontSize: 12, marginBottom: 50 },
  image: { width: '80%', height: 150, marginBottom: 50 },
  footer: { justifyContent: 'flex-end' },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});