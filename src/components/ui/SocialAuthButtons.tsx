import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  onPress?: () => void;
  color: string;
  backgroundColor: string;
}

const SocialButton = ({ icon, text, onPress, color, backgroundColor }: SocialButtonProps) => (
  <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
    <Ionicons name={icon} size={24} color={color} style={styles.icon} />
    <Text style={[styles.text, { color }]}>{text}</Text>
  </TouchableOpacity>
);

interface SocialAuthButtonsProps {
  onGoogle?: () => void;
  onApple?: () => void;
  onFacebook?: () => void;
}

export default function SocialAuthButtons({ onGoogle, onApple, onFacebook }: SocialAuthButtonsProps) {
  return (
    <View style={styles.container}>
      <SocialButton
        icon="logo-google"
        text="Continuar con Google"
        onPress={onGoogle}
        color="#000"
        backgroundColor="#fff"
      />
      <SocialButton
        icon="logo-apple"
        text="Continuar con Apple"
        onPress={onApple}
        color="#fff"
        backgroundColor="#000"
      />
      <SocialButton
        icon="logo-facebook"
        text="Continuar con Facebook"
        onPress={onFacebook}
        color="#fff"
        backgroundColor="#3b5998"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
