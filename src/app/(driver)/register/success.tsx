import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DriverSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Genial!</Text>
      
      {/* Imagen conductor */}
      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} contentFit="contain" />

      <Text style={styles.subtitle}>Sigamos configurando</Text>

      {/* Timeline simple */}
      <View style={styles.timeline}>
          <View style={styles.step}>
              <View style={[styles.circle, {backgroundColor: Colors.light.primary}]}>
                  <Ionicons name="document-text-outline" size={20} color={Colors.common.white} />
              </View>
              <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>¡Documentación arriba!</Text>
                  <Text style={styles.stepDesc}>Se revisará la información otorgada</Text>
              </View>
          </View>
          {/* Línea conectora */}
          <View style={styles.line} />
          
          <View style={styles.step}>
             <View style={[styles.circle, {backgroundColor: Colors.grey[700]}]}>
                  <Ionicons name="navigate-outline" size={20} color={Colors.grey[1100]} />
              </View>
              <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>Configuración de viajes</Text>
                  <Text style={styles.stepDesc}>Podrás realizar y aceptar viajes posterior a la verificación</Text>
              </View>
          </View>

          <View style={styles.line} />

          <View style={styles.step}>
              <View style={[styles.circle, {backgroundColor: Colors.grey[700]}]}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={Colors.grey[1100]} />
              </View>
               <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>Verificación lista</Text>
                  <Text style={styles.stepDesc}>En un transcurso de 24 horas se notificará la verificación</Text>
              </View>
          </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/driver/home')}>
            <Text style={styles.btnText}>Ir al Panel de Conductor</Text>
            <Ionicons name="car-sport" size={20} color={Colors.common.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.common.white, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 20 },
  image: { width: 150, height: 120, marginBottom: 30 },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: Colors.light.primary, marginBottom: 30 },
  
  timeline: { width: '100%', marginBottom: 40 },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  circle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  stepText: { marginLeft: 15, flex: 1 },
  stepTitle: { fontWeight: 'bold', color: Colors.grey[1100], fontSize: 14 },
  stepDesc: { color: Colors.grey[900], fontSize: 10 },
  line: { width: 2, height: 30, backgroundColor: Colors.grey[400], marginLeft: 19, marginTop: -5, marginBottom: -5 },

  btn: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 30, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: Colors.common.white, fontWeight: 'bold', fontSize: 18 },
});