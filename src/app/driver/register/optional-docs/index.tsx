import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function OptionalDocsScreen() {
  const router = useRouter();

  const OptionButton = ({ label, route }: { label: string, route?: string }) => (
    <TouchableOpacity style={styles.optionBtn} onPress={() => route && router.push(route as any)}>
        <Ionicons name="document-text-outline" size={24} color="#999" />
        <Text style={styles.optionText}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documentación que te puede{"\n"}beneficiar (opcional)</Text>
      
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <View style={styles.menu}>
          <OptionButton label="Seguro del Vehículo - SOAT (opcional)" />
          <OptionButton label="Copia de identificación fiscal - RFC (opcional)" />
          <OptionButton label="Foto de la identificación oficial del titular del vehículo (opcional)" />
          <OptionButton label="Estado civil (opcional)" />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/driver/register/contract')}>
            <Text style={styles.btnText}>Cerrar</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.light.primary, textAlign: 'center', marginBottom: 20, marginTop: 20 },
  image: { width: 120, height: 120, marginBottom: 30 },
  menu: { width: '100%', gap: 15, marginBottom: 30 },
  optionBtn: { 
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', 
      padding: 15, borderRadius: 12, elevation: 1,
      shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: {width:0, height:1}
  },
  optionText: { flex: 1, marginLeft: 10, color: '#666', fontSize: 13 },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 'auto' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
