import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function CustomDrawerContent(props: any) {
  const { user, logout, activeRole } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        
        {/* Header del Menú (Perfil) */}
        <View style={styles.header}>
            <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                style={styles.avatar} 
            />
            <View>
                <Text style={styles.name}>{user?.nombres || 'Usuario'} {user?.apellidos}</Text>
                <Text style={styles.roleBadge}>
                    {activeRole === 'driver' ? 'Conductor' : 'Pasajero'}
                </Text>
            </View>
        </View>

        {/* --- OPCIONES DEL MENÚ --- */}
        
        {/* Aquí renderizamos las pantallas definidas en el Drawer.Screen */}
        <View style={{ flex: 1, paddingTop: 10 }}>
            <DrawerItemList {...props} />
        </View>

        {/* Opciones Extra Personalizadas si faltan en el Drawer.Screen */}
        {activeRole === 'driver' && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Herramientas</Text>
                <DrawerItem 
                    label="Ganancias Semanales"
                    icon={({color}) => <Ionicons name="stats-chart" size={22} color={color} />}
                    onPress={() => router.push('/(driver)/earnings')}
                />
            </View>
        )}

      </DrawerContentScrollView>

      {/* Footer (Cerrar Sesión) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: { padding: 20, backgroundColor: Colors.light.primary, paddingTop: 60, flexDirection: 'row', alignItems: 'center', gap: 15 },
    avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#fff' },
    name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    roleBadge: { color: '#eee', fontSize: 12, marginTop: 2, textTransform: 'uppercase' },
    section: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
    sectionTitle: { marginLeft: 20, marginBottom: 5, fontSize: 12, color: '#999', fontWeight: 'bold' },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '500' }
});