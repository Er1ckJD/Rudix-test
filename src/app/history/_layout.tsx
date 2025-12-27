import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HistoryLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Historial de Viajes',
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background },
          headerTintColor: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
            </TouchableOpacity>
          )
        }} 
      />
      <Stack.Screen name="details" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
