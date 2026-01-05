import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function EditProfileScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Editar Perfil' }} />
            <Text style={styles.text}>Pantalla de Editar Perfil</Text>
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