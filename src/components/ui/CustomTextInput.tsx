import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { Colors } from '@/constants/theme';

interface CustomTextInputProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  rules?: object;
}

export default function CustomTextInput({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  rules = {},
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              error && styles.errorInput,
              isFocused && styles.focusedInput,
            ]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholderTextColor={Colors.grey[900]}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.grey[200],
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focusedInput: {
    borderColor: Colors.light.primary,
    backgroundColor: '#F0FDF4', // Verde muy tenue al enfocar
  },
  errorInput: {
    borderColor: Colors.common.error,
  },
  errorText: {
    color: Colors.common.error,
    marginTop: 5,
    marginLeft: 5,
  },
});