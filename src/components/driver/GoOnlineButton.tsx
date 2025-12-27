import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Colors } from '@/constants/theme';

interface GoOnlineButtonProps {
  isOnline: boolean;
  onPress: () => void;
}

export default function GoOnlineButton({ isOnline, onPress }: GoOnlineButtonProps) {
  const scale = useSharedValue(1);

  // Efecto de pulso si está OFFLINE (para llamar la atención)
  React.useEffect(() => {
    if (!isOnline) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1, // Infinito
        true 
      );
    } else {
      scale.value = withTiming(1);
    }
  }, [isOnline, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
       <Animated.View style={[styles.button, isOnline ? styles.onlineBtn : styles.offlineBtn, animatedStyle]}>
          <Ionicons name="power" size={32} color={isOnline ? Colors.common.error : Colors.common.white} />
          <Text style={[styles.text, isOnline ? styles.onlineText : styles.offlineText]}>
            {isOnline ? 'DESCONECTARSE' : 'INICIAR'}
          </Text>
       </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
      width: 90,
      height: 90,
      borderRadius: 45,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      borderWidth: 4,
  },
  offlineBtn: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.common.lightGreen,
  },
  onlineBtn: {
    backgroundColor: Colors.common.white,
    borderColor: Colors.common.error,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  offlineText: {
    color: Colors.common.white,
  },
  onlineText: {
    color: Colors.common.error,
  },
});