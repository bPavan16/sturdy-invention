import { useEffect, useRef, useState } from 'react';
import type { IncomingMessage, OutgoingMessage, ChatMessage } from '../types';
import { OutgoingSupportedMessage } from '../types';

interface UseWebSocketReturn {
    isConnected: boolean;
    messages: ChatMessage[];
    sendMessage: (message: IncomingMessage, currentUser?: { id: string; name: string }) => void;
    connect: () => void;
    disconnect: () => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    const connect = () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) return;

        const ws = new WebSocket(url, 'echo-protocol');

        ws.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        ws.onmessage = (event) => {
            try {
                const data: OutgoingMessage = JSON.parse(event.data);

                if (data.type === OutgoingSupportedMessage.AddChat) {
                    const newMessage: ChatMessage = {
                        id: data.payload.chatId,
                        name: data.payload.name,
                        message: data.payload.message,
                        upvotes: data.payload.upvotes,
                        timestamp: new Date(),
                    };
                    // Check if message already exists (to avoid duplicates from optimistic updates)
                    setMessages(prev => {
                        const exists = prev.find(msg => msg.id === newMessage.id);
                        if (exists) return prev;
                        return [...prev, newMessage];
                    });
                } else if (data.type === OutgoingSupportedMessage.UpdateChat) {
                    setMessages(prev => prev.map(msg =>
                        msg.id === data.payload.chatId
                            ? { ...msg, upvotes: data.payload.upvotes || msg.upvotes }
                            : msg
                    ));
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        wsRef.current = ws;
    };

    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
    };

    const sendMessage = (message: IncomingMessage, currentUser?: { id: string; name: string }) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            // Add optimistic update for SendMessage type
            if (message.type === 'SEND_MESSAGE' && currentUser) {
                const optimisticMessage: ChatMessage = {
                    id: `temp_${Date.now()}`, // Temporary ID
                    userId: currentUser.id,
                    name: currentUser.name,
                    message: message.payload.message,
                    upvotes: 0,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, optimisticMessage]);
            }
            
            wsRef.current.send(JSON.stringify(message));
        }
    };

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    return {
        isConnected,
        messages,
        sendMessage,
        connect,
        disconnect,
    };
};
