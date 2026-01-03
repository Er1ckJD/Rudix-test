import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessage } from 'react-native-gifted-chat';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export function useChat(tripId: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!tripId) return;

    // Conectar al socket
    socket.current = io(API_URL, {
        query: { tripId }
    });

    socket.current.on('connect', () => {
        setIsConnected(true);
        console.log('Socket connected');
    });

    socket.current.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket disconnected');
    });
    
    // Cargar mensajes iniciales (mock)
    socket.current.on('initial-messages', (initialMessages: IMessage[]) => {
        setMessages(initialMessages.reverse());
    });

    // Escuchar por nuevos mensajes
    socket.current.on('new-message', (message: IMessage) => {
      setMessages((previousMessages) =>
        [message, ...previousMessages]
      );
    });

    // Unirse a la sala del viaje
    socket.current.emit('join-trip', tripId);

    // Limpieza al desmontar
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [tripId]);

  const sendMessage = (message: IMessage) => {
    if (socket.current && isConnected) {
        socket.current.emit('send-message', message);
    }
  };

  return { messages, isConnected, sendMessage };
}
