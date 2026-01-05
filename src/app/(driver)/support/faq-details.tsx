import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function FaqDetailsScreen() {
    const { question } = useLocalSearchParams<{ question: string }>();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Respuesta' }} />
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.answer}>Aquí va la respuesta a la pregunta.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    answer: {
        fontSize: 16,
    }
});