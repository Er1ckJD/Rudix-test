import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme'; // <--- FALTABA ESTO

interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export default function CodeInput({ length = 4, onComplete }: CodeInputProps) {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleTextChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    const fullCode = newCode.join('');
    if (fullCode.length === length) {
      onComplete(fullCode);
    }
  };

  return (
    <View style={styles.container}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          style={styles.input}
          maxLength={1}
          keyboardType="number-pad"
          value={code[index]}
          onChangeText={(text) => handleTextChange(text, index)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: 60,
    height: 70,
    borderWidth: 1,
    borderColor: Colors.grey[700],
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 28,
    backgroundColor: Colors.grey[300],
  },
});