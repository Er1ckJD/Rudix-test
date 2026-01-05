// src/components/navigation/CustomDrawerContent.tsx
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import Constants from 'expo-constants';

export default function CustomDrawerContent(props: any) {
  const { user, logout, activeRole, switchActiveRole, roles } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  const handleRoleSwitch = () => {
    const newRole = activeRole === 'driver' ? 'user' : 'driver';
    switchActiveRole(newRole);
    
    // Navegar a la pantalla correcta después del cambio
    if (newRole === 'driver') {
      router.replace('/(driver)/(home)');
    } else {
      router.replace('/(passenger)/(home)');
    }
  };

  const canSwitchRole = roles.includes('user') && roles.includes('driver');

  return (
    <View style={styles.container}>
      <DrawerContentScrollView 
        {...props} 
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Header con información del usuario */}
        <View style={styles.header}>
          <Image 
            source={{ uri: user?.photoUrl || 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>
              {user?.nombres || 'Usuario'} {user?.apellidos}
            </Text>
            <View style={styles.roleBadge}>
              <MaterialCommunityIcons 
                name={activeRole === 'driver' ? 'steering' : 'account'} 
                size={14} 
                color={Colors.base.white} 
              />
              <Text style={styles.roleText}>
                {activeRole === 'driver' ? 'Conductor' : 'Pasajero'}
              </Text>
            </View>
          </View>
        </View>

        {/* Items del drawer */}
        <View style={styles.menuContainer}>
          {props.state.routes.map((route: any, index: number) => {
            const { options } = props.descriptors[route.key];
            
            if (options.drawerItemStyle?.display === 'none') {
              return null;
            }

            return (
              <DrawerItem
                key={route.key}
                icon={({ color, size }) => options.drawerIcon ? options.drawerIcon({ color, size }) : null}
                label={({ focused, color }) => (
                  <Text style={{ color, fontWeight: focused ? 'bold' : 'normal' }}>
                    {options.drawerLabel || options.title || route.name}
                  </Text>
                )}
                focused={props.state.index === index}
                onPress={() => {
                  props.navigation.navigate(route.name);
                }}
                activeTintColor={Colors.brand.primary}
                inactiveTintColor={Colors.grey[800]}
              />
            );
          })}
        </View>

      </DrawerContentScrollView>

      {/* Footer fijo con botones de acción */}
      <View style={styles.footer}>
        
        {/* Botón de cambio de rol (SIEMPRE VISIBLE si tiene ambos roles) */}
        {canSwitchRole && (
          <TouchableOpacity 
            style={styles.roleSwitcher} 
            onPress={handleRoleSwitch}
            activeOpacity={0.7}
          >
            <View style={styles.switcherContent}>
              <MaterialCommunityIcons 
                name="account-switch" 
                size={24} 
                color={Colors.brand.primary} 
              />
              <Text style={styles.switcherText}>
                Cambiar a modo {activeRole === 'driver' ? 'Pasajero' : 'Conductor'}
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={Colors.brand.primary} 
            />
          </TouchableOpacity>
        )}

        {/* Botón de cerrar sesión */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="log-out-outline" 
            size={24} 
            color={Colors.semantic.error} 
          />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* Versión de la app */}
        <Text style={styles.versionText}>
          RuDix v{Constants.expoConfig?.version || '1.0.0'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: Colors.base.white,
  },
  scrollContent: {
    paddingTop: 0,
  },
  
  // Header
  header: { 
    padding: Spacing.lg, 
    backgroundColor: Colors.brand.primary, 
    paddingTop: Spacing.xxxl, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: Spacing.md,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    borderWidth: 3, 
    borderColor: Colors.base.white 
  },
  userInfo: {
    flex: 1,
  },
  name: { 
    color: Colors.base.white, 
    fontSize: Typography.size.lg, 
    fontWeight: Typography.weight.bold,
    marginBottom: Spacing.xs,
  },
  roleBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)', 
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    gap: Spacing.xs,
  },
  roleText: {
    color: Colors.base.white, 
    fontSize: Typography.size.xs, 
    fontWeight: Typography.weight.semibold,
  },

  // Menu
  menuContainer: {
    flex: 1,
    paddingTop: Spacing.md,
  },

  // Footer
  footer: { 
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1, 
    borderTopColor: Colors.grey[200],
    backgroundColor: Colors.base.white,
  },

  // Role Switcher
  roleSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.brand.primary + '10',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.brand.primary + '30',
  },
  switcherContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  switcherText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.brand.primary,
    flex: 1,
  },

  // Logout
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  logoutText: { 
    color: Colors.semantic.error, 
    fontSize: Typography.size.base, 
    fontWeight: Typography.weight.semibold
  },

  // Version
  versionText: {
    textAlign: 'center',
    color: Colors.grey[500],
    fontSize: Typography.size.xs,
    marginTop: Spacing.md,
    fontWeight: Typography.weight.medium,
  }
});