import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

// Mock user and driver details
const USER_SELF = {
  _id: 1,
  name: 'Passenger',
  avatar: 'https://i.pravatar.cc/150?u=passenger',
};

const USER_OTHER = {
  _id: 2,
  name: 'Driver',
  avatar: 'https://i.pravatar.cc/150?u=driver',
};

export default function ChatScreen() {
  const { id: chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    // Mock loading initial messages for the given chatId
    setMessages([
      {
        _id: 1,
        text: '¡Hola! Ya estoy en camino.',
        createdAt: new Date(Date.now() - 60 * 1000), // 1 minute ago
        user: USER_OTHER,
      },
      {
        _id: 2,
        text: 'Perfecto, ¡te espero!',
        createdAt: new Date(),
        user: USER_SELF,
      },
    ]);
  }, [chatId]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    // Here you would send the message to your backend
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={USER_SELF}
        placeholder="Escribe un mensaje..."
        alwaysShowSend
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
