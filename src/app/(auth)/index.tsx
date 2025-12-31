import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button'; // NUEVO
import { Colors, Spacing, Typography, hexWithOpacity } from '@/constants/theme'; // NUEVO

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <View style={styles.indicatorContainer}>
                <View style={[styles.indicator, styles.indicatorActive]} />
                <View style={styles.indicator} />
                <View style={styles.indicator} />
              </View>
              
              <Text style={styles.title}>BIENVENIDO</Text>
              <Text style={styles.subtitle}>RuDix: Tu viaje seguro empieza aquí</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Continuar"
                onPress={() => router.push('/(onboarding)/security')}
                variant="primary"
                gradient
                fullWidth
              />
            </View>

            <Text style={styles.footerText}>
              RuDix Privacy Policy and Terms of Use
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.base.black 
  },
  background: { 
    flex: 1, 
    backgroundColor: Colors.dark.background 
  },
  safeArea: { 
    flex: 1 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  textContainer: { 
    marginBottom: Spacing.xl 
  },
  indicatorContainer: { 
    flexDirection: 'row', 
    gap: Spacing.sm, 
    marginBottom: Spacing.md 
  },
  indicator: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: hexWithOpacity(Colors.base.white, 0.3) 
  },
  indicatorActive: { 
    width: 24, 
    backgroundColor: Colors.base.white 
  },
  title: { 
    fontSize: Typography.size.xxxl, 
    fontWeight: Typography.weight.bold, 
    color: Colors.base.white, 
    textTransform: 'uppercase' 
  },
  subtitle: { 
    fontSize: Typography.size.md, 
    color: Colors.grey[400], 
    marginTop: Spacing.sm 
  },
  buttonContainer: { 
    width: '100%', 
    marginBottom: Spacing.lg 
  },
  footerText: { 
    color: hexWithOpacity(Colors.base.white, 0.5), 
    fontSize: Typography.size.xs, 
    textAlign: 'center' 
  },
});
