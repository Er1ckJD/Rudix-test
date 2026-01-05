import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function ManageVehiclesScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Gestionar Vehículos' }} />
            <Text style={styles.text}>Pantalla de Gestión de Vehículos</Text>
            <Text style={styles.text}>Aún no implementada.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    }
});