import React, { useCallback } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';

export default function ChatScreen() {
  const { id: chatId } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { messages, isConnected, sendMessage } = useChat(chatId);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    const messageToSend = {
      ...newMessages[0],
      user: {
        _id: user?.id || 0,
        name: user?.name || 'Passenger',
      }
    };
    sendMessage(messageToSend);
  }, [sendMessage, user]);

  return (
    <SafeAreaView style={styles.container}>
        {!isConnected && (
            <View style={styles.connectionStatus}>
                <Text style={styles.connectionText}>Conectando...</Text>
            </View>
        )}
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{
            _id: user?.id || 0,
            name: user?.name || 'Passenger',
        }}
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
  connectionStatus: {
    backgroundColor: '#ffc107',
    padding: 5,
    alignItems: 'center',
  },
  connectionText: {
    color: 'white',
  },
});
