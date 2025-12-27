import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function NotificationsSettingsScreen() {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(false);

  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = colorScheme === 'light' ? '#f0f0f0' : Colors.grey[1400];
  const descriptionColor = useThemeColor({ light: '#666', dark: Colors.grey[900] }, 'text');


  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Stack.Screen options={{ title: 'Notificaciones' }} />
      <ThemedView style={styles.content}>
        <View style={[styles.row, { borderBottomColor: borderColor }]}>
          <ThemedText style={styles.label}>Notificaciones Push</ThemedText>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#767577', true: Colors.light.primary }}
            thumbColor={'#fff'}
          />
        </View>
        <ThemedText style={[styles.description, { color: descriptionColor }]}>
          Recibe alertas sobre tus viajes, promociones y actualizaciones de la app.
        </ThemedText>
        
        <View style={[styles.row, { borderBottomColor: borderColor }]}>
          <ThemedText style={styles.label}>Notificaciones por correo</ThemedText>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: '#767577', true: Colors.light.primary }}
            thumbColor={'#fff'}
          />
        </View>
        <ThemedText style={[styles.description, { color: descriptionColor }]}>
          Recibe recibos, resúmenes de actividad y noticias en tu correo electrónico.
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    paddingVertical: 10,
  }
});
