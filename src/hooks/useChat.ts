import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { IMessage } from 'react-native-gifted-chat';
import { ENV } from '@/config/env';
import { Alert } from 'react-native';

export function useChat(tripId: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!tripId) return;

    // Opciones de conexión del socket
    const socketOptions = {
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        query: { tripId }
    };

    // Conectar al socket
    socket.current = io(ENV.socketUrl, socketOptions);

    const handleConnect = () => {
        setIsConnected(true);
        setError(null);
        console.log('Socket connected successfully');
        socket.current?.emit('join-trip', tripId);
    };

    const handleDisconnect = (reason: Socket.DisconnectReason) => {
        setIsConnected(false);
        console.log(`Socket disconnected: ${reason}`);
        if (reason === 'io server disconnect') {
            // El servidor cerró la conexión, no intentar reconectar.
            socket.current?.connect();
        }
        // Para otras razones (e.g., 'transport close'), la reconexión es automática.
    };

    const handleConnectError = (err: Error) => {
        console.error('Socket connection error:', err.message);
        setError(`Error de conexión: ${err.message}`);
        Alert.alert('Error de Chat', 'No se pudo conectar al servidor de chat. Intentando reconectar...');
    };

    const handleInitialMessages = (initialMessages: IMessage[]) => {
        setMessages(initialMessages.reverse());
    };

    const handleNewMessage = (message: IMessage) => {
      setMessages((previousMessages) =>
        [message, ...previousMessages]
      );
    };

    // Asignar listeners
    socket.current.on('connect', handleConnect);
    socket.current.on('disconnect', handleDisconnect);
    socket.current.on('connect_error', handleConnectError);
    socket.current.on('initial-messages', handleInitialMessages);
    socket.current.on('new-message', handleNewMessage);

    // Limpieza al desmontar
    return () => {
      if (socket.current) {
        console.log('Cleaning up chat socket...');
        socket.current.emit('leave-trip', tripId);
        socket.current.off('connect', handleConnect);
        socket.current.off('disconnect', handleDisconnect);
        socket.current.off('connect_error', handleConnectError);
        socket.current.off('initial-messages', handleInitialMessages);
        socket.current.off('new-message', handleNewMessage);
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [tripId]);

  const sendMessage = (message: IMessage) => {
    if (socket.current && isConnected) {
        socket.current.emit('send-message', message);
    } else {
        Alert.alert('No Conectado', 'No puedes enviar mensajes porque no estás conectado al chat.');
    }
  };

  return { messages, isConnected, error, sendMessage };
}
