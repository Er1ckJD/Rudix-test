import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@/constants/theme';
import Constants from 'expo-constants';

export default function CustomDrawerContent(props: any) {
  const { user, logout, activeRole, switchActiveRole, roles } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  const canSwitchRole = roles.includes('user') && roles.includes('driver');

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        
        <View style={styles.header}>
            <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                style={styles.avatar} 
            />
            <View>
                <Text style={styles.name}>{user?.nombres || 'Usuario'} {user?.apellidos}</Text>
                <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>
                        {activeRole === 'driver' ? 'Conductor' : 'Pasajero'}
                    </Text>
                </View>
            </View>
        </View>

        <View style={{ flex: 1, paddingTop: Spacing.md }}>
            <DrawerItemList {...props} />
        </View>

        {activeRole === 'driver' && (
            <View style={styles.section}>
                <DrawerItem 
                    label="Ganancias"
                    labelStyle={styles.drawerLabel}
                    icon={({color, size}) => <Ionicons name="wallet-outline" size={size} color={color} />}
                    onPress={() => router.push('/(driver)/earnings')}
                />
            </View>
        )}

        {canSwitchRole && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cambiar de rol</Text>
                <TouchableOpacity 
                    style={styles.roleSwitcher} 
                    onPress={() => switchActiveRole(activeRole === 'driver' ? 'user' : 'driver')}
                >
                    <MaterialCommunityIcons name="account-switch-outline" size={24} color={Colors.brand.primary} />
                    <Text style={styles.roleSwitcherText}>
                        Cambiar a modo {activeRole === 'driver' ? 'Pasajero' : 'Conductor'}
                    </Text>
                </TouchableOpacity>
            </View>
        )}


      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={Colors.semantic.error} />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>
            v{Constants.expoConfig?.version}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: { 
        padding: Spacing.lg, 
        backgroundColor: Colors.brand.primary, 
        paddingTop: Spacing.xxxl, 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: Spacing.md 
    },
    avatar: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        borderWidth: 2, 
        borderColor: Colors.base.white 
    },
    name: { 
        color: Colors.base.white, 
        fontSize: Typography.size.lg, 
        fontWeight: Typography.weight.bold 
    },
    roleBadge: { 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: Spacing.sm
    },
    roleText: {
        color: Colors.base.white, 
        fontSize: Typography.size.xs, 
        fontWeight: Typography.weight.semibold
    },
    drawerLabel: {
        fontSize: Typography.size.base,
        fontWeight: Typography.weight.medium
    },
    section: { 
        marginTop: Spacing.md, 
        borderTopWidth: 1, 
        borderTopColor: Colors.grey[200], 
        paddingTop: Spacing.md 
    },
    sectionTitle: { 
        marginLeft: Spacing.lg, 
        marginBottom: Spacing.sm, 
        fontSize: Typography.size.sm, 
        color: Colors.grey[600], 
        fontWeight: Typography.weight.bold 
    },
    roleSwitcher: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        gap: Spacing.md,
        backgroundColor: Colors.brand.primary + '15',
        marginHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    roleSwitcherText: {
        fontSize: Typography.size.base,
        fontWeight: Typography.weight.semibold,
        color: Colors.brand.primary,
    },
    footer: { 
        padding: Spacing.lg, 
        borderTopWidth: 1, 
        borderTopColor: Colors.grey[200] 
    },
    logoutBtn: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    logoutText: { 
        color: Colors.semantic.error, 
        fontSize: Typography.size.base, 
        fontWeight: Typography.weight.semibold
    },
    versionText: {
        textAlign: 'center',
        color: Colors.grey[500],
        fontSize: Typography.size.xs,
        marginTop: Spacing.md,
    }
});