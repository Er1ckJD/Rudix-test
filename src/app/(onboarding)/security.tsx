import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { Colors, Spacing, Typography, hexWithOpacity } from '@/constants/theme';

export default function OnboardingSecurityScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <View style={styles.indicatorContainer}>
                <View style={styles.indicator} />
                <View style={[styles.indicator, styles.indicatorActive]} />
                <View style={styles.indicator} />
              </View>
              
              <Text style={styles.title}>Tu seguridad, nuestro motor</Text>
              <Text style={styles.subtitle}>Viaja con confianza. Conductores verificados y soporte 24/7 para tu tranquilidad.</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Continuar"
                onPress={() => router.push('/(onboarding)/comfort')}
                variant="primary"
                gradient
                fullWidth
              />
            </View>
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
    backgroundColor: Colors.grey[900] 
  },
  safeArea: { 
    flex: 1 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  textContainer: { 
    marginBottom: Spacing.xxl 
  },
  indicatorContainer: { 
    flexDirection: 'row', 
    gap: Spacing.sm, 
    marginBottom: Spacing.lg 
  },
  indicator: { 
    height: 8, 
    width: 8, 
    borderRadius: 4, 
    backgroundColor: hexWithOpacity(Colors.base.white, 0.3) 
  },
  indicatorActive: { 
    width: 24, 
    backgroundColor: Colors.brand.primary 
  },
  title: { 
    fontSize: Typography.size.xxxl, 
    fontWeight: Typography.weight.bold, 
    color: Colors.base.white, 
    marginBottom: Spacing.md 
  },
  subtitle: { 
    fontSize: Typography.size.md, 
    color: Colors.grey[400], 
    lineHeight: Typography.size.md * 1.5 
  },
  buttonContainer: { 
    width: '100%' 
  },
});
