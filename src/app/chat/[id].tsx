import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mensajes simulados iniciales
const MOCK_MESSAGES = [
  { id: '1', text: '¡Hola! Voy en camino.', sender: 'driver', time: '14:30' },
  { id: '2', text: 'Entendido, te espero en la entrada.', sender: 'me', time: '14:31' },
];

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ID del viaje
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');
    
    // Simular respuesta del conductor después de 2 seg
    setTimeout(() => {
        const reply = {
            id: (Date.now() + 1).toString(),
            text: 'Ok, llego en 2 minutos.',
            sender: 'driver',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  // Auto-scroll al final al recibir mensajes
  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Personalizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.grey[1400]} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
            <Text style={styles.driverName}>Carlos Mendoza</Text>
            <Text style={styles.carInfo}>Nissan Versa • 723-AZW</Text>
        </View>
        <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[
                styles.bubble, 
                item.sender === 'me' ? styles.bubbleMe : styles.bubbleDriver
            ]}>
              <Text style={[
                  styles.msgText, 
                  item.sender === 'me' ? styles.textMe : styles.textDriver
              ]}>
                {item.text}
              </Text>
              <Text style={[
                  styles.timeText,
                  item.sender === 'me' ? { color: 'rgba(255,255,255,0.7)' } : { color: Colors.grey[800] }
              ]}>
                {item.time}
              </Text>
            </View>
          )}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Escribe un mensaje..."
                value={inputText}
                onChangeText={setInputText}
                placeholderTextColor={Colors.grey[800]}
            />
            <TouchableOpacity 
                style={[styles.sendBtn, !inputText && styles.sendBtnDisabled]} 
                onPress={sendMessage}
                disabled={!inputText}
            >
                <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { 
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
      paddingHorizontal: 15, paddingVertical: 15,
      borderBottomWidth: 1, borderBottomColor: Colors.grey[200]
  },
  backBtn: { padding: 5 },
  headerInfo: { flex: 1, marginLeft: 15 },
  driverName: { fontSize: 16, fontWeight: 'bold', color: Colors.grey[1400] },
  carInfo: { fontSize: 12, color: Colors.grey[900] },
  callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center' },

  listContent: { padding: 15, paddingBottom: 20 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 10 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: Colors.light.primary, borderBottomRightRadius: 2 },
  bubbleDriver: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: Colors.grey[200] },
  msgText: { fontSize: 15, marginBottom: 4 },
  textMe: { color: '#fff' },
  textDriver: { color: Colors.grey[1400] },
  timeText: { fontSize: 10, alignSelf: 'flex-end' },

  inputContainer: { 
      flexDirection: 'row', alignItems: 'center', padding: 10, 
      backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: Colors.grey[200] 
  },
  input: { flex: 1, backgroundColor: Colors.grey[100], borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, height: 45, marginRight: 10 },
  sendBtn: { width: 45, height: 45, borderRadius: 25, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: Colors.grey[400] },
});