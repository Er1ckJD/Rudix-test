import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlmostThereScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Ya casi!</Text>
      
      {/* Imagen conductor celebrando */}
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <Text style={styles.subtitle}>Sigamos configurando</Text>

      {/* Timeline */}
      <View style={styles.timeline}>
          {/* Paso 1: Completado */}
          <View style={styles.step}>
              <View style={[styles.circle, {backgroundColor: Colors.light.primary}]}>
                  <Ionicons name="document-text-outline" size={20} color="#fff" />
              </View>
              <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>¡Documentación arriba!</Text>
                  <Text style={styles.stepDesc}>Se revisará la información otorgada</Text>
              </View>
          </View>
          <View style={[styles.line, {backgroundColor: Colors.light.primary}]} />
          
          {/* Paso 2: Activo */}
          <View style={styles.step}>
             <View style={[styles.circle, {backgroundColor: Colors.light.primary}]}>
                  <Ionicons name="construct-outline" size={20} color="#fff" />
              </View>
              <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>¡Configuración de viajes lista!</Text>
                  <Text style={styles.stepDesc}>Podrás realizar y aceptar viajes posterior a la verificación</Text>
              </View>
          </View>
          <View style={styles.line} />

          {/* Paso 3: Pendiente */}
          <View style={styles.step}>
              <View style={[styles.circle, {backgroundColor: '#ddd'}]}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#666" />
              </View>
               <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>Verificación lista</Text>
                  <Text style={styles.stepDesc}>En un transcurso de 24 horas se notificará la verificación</Text>
              </View>
          </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/driver/register/optional-docs')}>
            <Text style={styles.btnText}>Continuar</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
// ... (Usa los mismos estilos de success.tsx) ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 20 },
  image: { width: 150, height: 120, marginBottom: 30 },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 30 },
  timeline: { width: '100%', marginBottom: 40 },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  circle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  stepText: { marginLeft: 15, flex: 1 },
  stepTitle: { fontWeight: 'bold', color: '#666', fontSize: 14 },
  stepDesc: { color: '#999', fontSize: 10 },
  line: { width: 2, height: 30, backgroundColor: '#eee', marginLeft: 19, marginTop: -5, marginBottom: -5 },
  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});