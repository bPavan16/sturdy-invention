import { useState } from 'react';
import { Send, Users, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChatSections } from './ChatSections';
import { ThemeToggle } from './ThemeToggle';
import { useWebSocket } from '../hooks/useWebSocket';
import { IncomingSupportedMessage } from '../types';
import type { User } from '../types';

export const ChatInterface = () => {
    const [user, setUser] = useState<User | null>(null);
    const [currentMessage, setCurrentMessage] = useState('');
    const [joinForm, setJoinForm] = useState({
        name: '',
        roomId: '',
    });

    const { isConnected, messages, sendMessage, connect } = useWebSocket('ws://localhost:8080');

    const handleJoinRoom = () => {
        if (!joinForm.name.trim() || !joinForm.roomId.trim()) return;

        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newUser: User = {
            id: userId,
            name: joinForm.name.trim(),
            roomId: joinForm.roomId.trim(),
        };

        setUser(newUser);
        connect();

        // Send join room message after connection is established
        setTimeout(() => {
            sendMessage({
                type: IncomingSupportedMessage.JoinRoom,
                payload: {
                    name: newUser.name,
                    userId: newUser.id,
                    roomId: newUser.roomId,
                },
            });
        }, 100);
    };

    const handleSendMessage = () => {
        if (!currentMessage.trim() || !user || !isConnected) return;

        sendMessage({
            type: IncomingSupportedMessage.SendMessage,
            payload: {
                userId: user.id,
                roomId: user.roomId,
                message: currentMessage.trim(),
            },
        }, user); // Pass user for optimistic updates

        setCurrentMessage('');
    };

    const handleUpvote = (messageId: string) => {
        if (!user || !isConnected) return;

        sendMessage({
            type: IncomingSupportedMessage.UpvoteMessage,
            payload: {
                userId: user.id,
                roomId: user.roomId,
                chatId: messageId,
            },
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (user) {
                handleSendMessage();
            } else {
                handleJoinRoom();
            }
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 relative">
                {/* Theme Toggle in top right */}
                <div className="absolute top-6 right-6">
                    <ThemeToggle />
                </div>

                <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Join Chat
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Enter your details to start chatting
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Name
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={joinForm.name}
                                onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                                onKeyPress={handleKeyPress}
                                className="h-11 border-0 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Room ID
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter room ID"
                                value={joinForm.roomId}
                                onChange={(e) => setJoinForm({ ...joinForm, roomId: e.target.value })}
                                onKeyPress={handleKeyPress}
                                className="h-11 border-0 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-lg"
                            />
                        </div>

                        <Button
                            onClick={handleJoinRoom}
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors mt-6"
                            disabled={!joinForm.name.trim() || !joinForm.roomId.trim()}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Join Room
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto p-2 h-screen flex flex-col max-w-7xl">

                {/* Sleek Header */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {"Room : "}{user.roomId}
                        </h1>
                        <span className="text-xl justify-center text-gray-500 self-center dark:text-white">
                            {"Username - "}{user.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${isConnected
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            {isConnected ? 'Online' : 'Offline'}
                        </div>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Chat Sections */}
                <div className="flex-1 flex flex-col">
                    <ChatSections messages={messages} onUpvote={handleUpvote} currentUserId={user.id} />

                    {/* Sleek Message Input */}
                    <div className="mt-6 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                        <div className="flex gap-3">
                            <Input
                                type="text"
                                placeholder="Type a message..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={!isConnected}
                                className="flex-1 h-11 border-0 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-colors rounded-lg px-4"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!currentMessage.trim() || !isConnected}
                                size="default"
                                className="h-11 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all duration-200"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
