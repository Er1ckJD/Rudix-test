import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Imports de tu sistema de diseño y componentes
import { Colors, Spacing, CommonStyles, Typography } from '@/constants/theme';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Datos de ejemplo (Mock Data)
const DRIVER_FIDELITY = {
    level: 'plus', // 'base' | 'plus' | 'premium'
    points: 1450,
    nextLevelPoints: 2000,
    trips: 124,
    rating: 4.9,
};

const LEVEL_CONFIG = {
    base: { name: 'Bronce', color: '#CD7F32', icon: 'medal-outline' },
    plus: { name: 'Plata', color: '#C0C0C0', icon: 'shield-checkmark-outline' },
    premium: { name: 'Oro', color: '#FFD700', icon: 'star' },
};

export default function DriverFidelityScreen() {
    const navigation = useNavigation();

    // Lógica simple para configurar la vista actual
    const currentConfig = LEVEL_CONFIG[DRIVER_FIDELITY.level as keyof typeof LEVEL_CONFIG];
    const progress = (DRIVER_FIDELITY.points / DRIVER_FIDELITY.nextLevelPoints) * 100;
    const remainingPoints = DRIVER_FIDELITY.nextLevelPoints - DRIVER_FIDELITY.points;

    return (
        <SafeAreaView style={styles.container}>
            {/* Configuración del Header */}
            <Stack.Screen
                options={{
                    title: 'RuDix Fidelity',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: Colors.light.surface },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                            style={{ marginRight: 15 }}
                        >
                            <Ionicons name="menu" size={28} color={Colors.light.text} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 1. SECCIÓN DE NIVEL (Insignia grande) */}
                <View style={styles.headerContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: currentConfig.color }]}>
                        <Ionicons name={currentConfig.icon as any} size={40} color="white" />
                    </View>
                    <Text style={styles.levelTitle}>Nivel {currentConfig.name}</Text>
                    <Text style={styles.pointsSubtitle}>{DRIVER_FIDELITY.points} Puntos acumulados</Text>
                </View>

                {/* 2. TARJETA DE PROGRESO */}
                <Card variant="elevated" style={styles.cardSpacing}>
                    <Card.Content>
                        <View style={CommonStyles.rowBetween}>
                            <Text style={styles.cardTitle}>Siguiente meta: Oro</Text>
                            <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
                        </View>

                        {/* Barra de progreso */}
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>

                        <Text style={CommonStyles.caption}>
                            ¡Estás cerca! Solo te faltan {remainingPoints} puntos para subir de nivel.
                        </Text>
                    </Card.Content>
                </Card>

                {/* 3. ESTADÍSTICAS RÁPIDAS (Grid de 2 columnas) */}
                <View style={styles.statsRow}>
                    <Card style={{ ...styles.statCard, marginRight: Spacing.sm }}>
                        <Card.Content style={CommonStyles.centerContent}>
                            <Ionicons name="car-sport" size={24} color={Colors.brand.primary} />
                            <Text style={styles.statNumber}>{DRIVER_FIDELITY.trips}</Text>
                            <Text style={CommonStyles.caption}>Viajes</Text>
                        </Card.Content>
                    </Card>

                    <Card style={{ ...styles.statCard, marginLeft: Spacing.sm }}>
                        <Card.Content style={CommonStyles.centerContent}>
                            <Ionicons name="star" size={24} color={Colors.brand.secondary} />
                            <Text style={styles.statNumber}>{DRIVER_FIDELITY.rating}</Text>
                            <Text style={CommonStyles.caption}>Calificación</Text>
                        </Card.Content>
                    </Card>

                </View>

                {/* 4. LISTA DE BENEFICIOS */}
                <Text style={styles.sectionTitle}>Tus Beneficios Activos</Text>

                <Card variant="outlined" style={styles.cardSpacing}>
                    <Card.Content>
                        <BenefitItem icon="cash-outline" text="Comisión reducida al 10%" active={true} />
                        <Card.Divider />
                        <BenefitItem icon="flash-outline" text="Prioridad en asignación de viajes" active={true} />
                        <Card.Divider />
                        <BenefitItem icon="headset-outline" text="Soporte VIP 24/7" active={true} />
                        <Card.Divider />
                        <BenefitItem icon="gift-outline" text="Bonos exclusivos (Nivel Oro)" active={false} />
                    </Card.Content>
                </Card>

                {/* Botón de acción */}
                <Button
                    title="Ver tabla de niveles completa"
                    variant="ghost"
                    size="md"
                    onPress={() => {}}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

// Componente auxiliar para ítems de la lista (definido aquí mismo para simplicidad)
function BenefitItem({ icon, text, active }: { icon: any, text: string, active: boolean }) {
    const iconColor = active ? Colors.brand.primary : Colors.grey[400];
    const textColor = active ? Colors.light.text : Colors.grey[400];

    return (
        <View style={styles.benefitRow}>
            <View style={[styles.benefitIconBox, { backgroundColor: active ? Colors.brand.primary + '15' : Colors.grey[100] }]}>
                <Ionicons name={icon} size={20} color={iconColor} />
            </View>
            <Text style={[styles.benefitText, { color: textColor }]}>{text}</Text>
            {active && (
                <Ionicons name="checkmark-circle" size={18} color={Colors.semantic.success} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.surface
    },
    scrollContent: {
        padding: Spacing.md,
        paddingBottom: Spacing.xxl
    },

    // Header Styles
    headerContainer: {
        alignItems: 'center',
        marginVertical: Spacing.lg
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
        // Sombra suave para resaltar el icono
        shadowColor: Colors.brand.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    levelTitle: {
        ...CommonStyles.h2,
        marginBottom: Spacing.xs
    },
    pointsSubtitle: {
        ...CommonStyles.body,
        color: Colors.light.textSecondary
    },

    // Progress Card Styles
    cardSpacing: {
        marginBottom: Spacing.md
    },
    cardTitle: {
        fontSize: Typography.size.md,
        fontWeight: '600',
        marginBottom: Spacing.sm
    },
    percentageText: {
        fontWeight: 'bold',
        color: Colors.brand.primary
    },
    progressBarBg: {
        height: 8,
        backgroundColor: Colors.grey[200],
        borderRadius: 4,
        marginBottom: Spacing.sm,
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.brand.primary
    },

    // Stats Styles
    statsRow: {
        flexDirection: 'row',
        marginBottom: Spacing.lg
    },
    statCard: {
        flex: 1
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.sm
    },
    statNumber: {
        ...CommonStyles.h2,
        marginVertical: Spacing.xs
    },

    // Benefits Styles
    sectionTitle: {
        ...CommonStyles.h3,
        marginBottom: Spacing.md,
        marginTop: Spacing.sm
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.xs,
    },
    benefitIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    benefitText: {
        flex: 1,
        fontSize: Typography.size.base,
    },
});
