import { useRouter, Stack } from 'expo-router';
import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Switch,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const { user, logout, activeRole, switchActiveRole, loading } = useAuth();
    const isDriver = activeRole === 'driver';

    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres salir?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Salir",
                    onPress: () => {
                        logout();
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const handleToggleDriverMode = () => {
        const newRole = isDriver ? 'user' : 'driver';
        switchActiveRole(newRole);
        router.replace(newRole === 'driver' ? '/driver/home' : '/');
    };

    const sections = [
        {
            title: 'Cuenta',
            items: [
                { label: 'Editar Perfil', icon: 'person-outline', action: () => router.push('/profile') },
                { label: 'Seguridad', icon: 'shield-checkmark-outline', action: () => router.push('/security') },
                { label: 'Notificaciones', icon: 'notifications-outline', action: () => router.push('/(info)/notifications') },
            ],
        },
        {
            title: 'Soporte',
            items: [
                { label: 'Ayuda', icon: 'help-circle-outline', action: () => router.push('/(info)/help') },
                { label: 'Contáctanos', icon: 'mail-outline', action: () => router.push('/(info)/contact') },
            ],
        },
        {
            title: 'Legal',
            items: [
                { label: 'Términos y Condiciones', icon: 'document-text-outline', action: () => router.push('/(info)/terms') },
                { label: 'Política de Privacidad', icon: 'lock-closed-outline', action: () => router.push('/(info)/privacy') },
            ],
        }
    ];

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen 
                options={{ 
                title: 'Configuración', 
                headerShadowVisible: false,
                headerStyle: { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background },
                headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
                }} 
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity style={styles.avatar}>
                        <Image
                            source={{ uri: `https://ui-avatars.com/api/?name=${user?.nombres}+${user?.apellidos}&background=random` }}
                            style={styles.avatarImage}
                        />
                    </TouchableOpacity>
                    <ThemedText type='title' style={styles.profileName}>
                        {user ? `${user.nombres} ${user.apellidos}` : 'Invitado'}
                    </ThemedText>
                    <ThemedText style={styles.profileEmail}>
                        {user?.email}
                    </ThemedText>
                </View>

                {user?.roles?.includes('driver') && (
                    <View style={styles.section}>
                        <View style={[styles.sectionBody, styles.driverModeSection]}>
                            <View style={styles.itemLeft}>
                                <View style={[styles.iconContainer, { backgroundColor: Colors.light.primaryTransparent }]}>
                                    <Ionicons name="car-sport-outline" size={22} color={Colors.light.primary} />
                                </View>
                                <ThemedText style={styles.itemLabel}>Modo Conductor</ThemedText>
                            </View>
                            <Switch
                                value={isDriver}
                                onValueChange={handleToggleDriverMode}
                                trackColor={{ false: Colors.grey[400], true: Colors.light.primary }}
                                thumbColor={isDriver ? '#fff' : '#fff'}
                                disabled={loading}
                            />
                        </View>
                    </View>
                )}

                {sections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <ThemedText type='caption' style={styles.sectionHeader}>{section.title}</ThemedText>
                        <View style={styles.sectionBody}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity key={itemIndex} style={styles.item} onPress={item.action}>
                                    <View style={styles.itemLeft}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name={item.icon as any} size={20} color={Colors.grey[1200]} />
                                        </View>
                                        <ThemedText style={styles.itemLabel}>{item.label}</ThemedText>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={Colors.grey[950]} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={styles.section}>
                    <TouchableOpacity style={[styles.sectionBody, styles.logoutButton]} onPress={handleLogout}>
                        <View style={styles.itemLeft}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="log-out-outline" size={22} color={Colors.common.error} />
                            </View>
                            <ThemedText style={[styles.itemLabel, { color: Colors.common.error }]}>Cerrar Sesión</ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.grey[300],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: Colors.light.primary,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    profileName: {
        fontWeight: '600',
        marginBottom: 4,
    },
    profileEmail: {
        color: Colors.grey[1100],
        fontSize: 14,
    },
    section: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    sectionHeader: {
        fontWeight: '600',
        textTransform: 'uppercase',
        color: Colors.grey[1100],
        fontSize: 12,
        marginBottom: 10,
        paddingLeft: 5
    },
    sectionBody: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.grey[200],
    },
    driverModeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey[200],
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 34,
        height: 34,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        backgroundColor: Colors.grey[100],
    },
    itemLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: Colors.common.lightRed,
        borderColor: Colors.common.error,
        justifyContent: 'center',
        padding: 15,
    }
});