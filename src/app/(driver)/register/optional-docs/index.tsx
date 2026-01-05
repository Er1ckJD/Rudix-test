import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OptionalDocsScreen() {
  const router = useRouter();

  const OptionButton = ({ label, route }: { label: string, route?: string }) => (
    <TouchableOpacity style={styles.optionBtn} onPress={() => route && router.push(route as any)}>
        <Ionicons name="document-text-outline" size={24} color={Colors.light.textSecondary} />
        <Text style={styles.optionText}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.light.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.base.black} />
            </TouchableOpacity>
        </View>
      <Text style={styles.title}>Documentación que te puede{"\n"}beneficiar (opcional)</Text>
      
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <View style={styles.menu}>
          <OptionButton label="Seguro del Vehículo - SOAT (opcional)" />
          <OptionButton label="Copia de identificación fiscal - RFC (opcional)" />
          <OptionButton label="Foto de la identificación oficial del titular del vehículo (opcional)" />
          <OptionButton label="Estado civil (opcional)" />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/(driver)/register/contract')}>
            <Text style={styles.btnText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.base.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.base.white, padding: 20, alignItems: 'center' },
  header: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.brand.primary, textAlign: 'center', marginBottom: 20, marginTop: 40 },
  image: { width: 120, height: 120, marginBottom: 30 },
  menu: { width: '100%', gap: 15, marginBottom: 30 },
  optionBtn: { 
      flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.grey[100], 
      padding: 15, borderRadius: 12,
      ...Shadows.sm,
  },
  optionText: { flex: 1, marginLeft: 10, color: Colors.light.textSecondary, fontSize: 13 },
  btn: { backgroundColor: Colors.brand.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 'auto' },
  btnText: { color: Colors.base.white, fontWeight: 'bold', fontSize: 18 },
});
