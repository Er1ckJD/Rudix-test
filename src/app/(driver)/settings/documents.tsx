import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function DocumentsScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Documentos' }} />
            <Text style={styles.text}>Pantalla de Documentos</Text>
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