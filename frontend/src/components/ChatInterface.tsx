import { useState } from 'react';
import { Send, Users, MessageSquare, UserIcon, HomeIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChatSections } from './ChatSections';
import { ThemeToggle } from './ThemeToggle';
import { UserListDialog } from './UserListDialog';
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

    const { isConnected, messages, users, sendMessage, connect } = useWebSocket();

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
        });

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
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950">
                {/* Enhanced Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Primary background pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>
                    
                    {/* Floating orbs */}
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute top-40 right-32 w-40 h-40 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-32 left-40 w-24 h-24 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
                    <div className="absolute bottom-20 right-20 w-36 h-36 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-2xl animate-pulse delay-700"></div>
                    
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)]"></div>
                </div>

                {/* Theme Toggle */}
                <div className="absolute top-4 right-4 z-50">
                    <ThemeToggle />
                </div>

                {/* Main Content */}
                <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
                    <div className="w-full max-w-md">
                        {/* Main Card */}
                        <div className="relative">
                            {/* Gradient border effect */}
                       
                            
                            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-gray-700/50 shadow-2xl p-6 sm:p-8">
                                {/* Header */}
                                <div className="text-center mb-6 sm:mb-8">
                                    {/* Icon */}
                                    <div className="relative mx-auto w-16 h-16 mb-4 sm:mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-md opacity-60 animate-pulse"></div>
                                        <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-12 transition-transform duration-300">
                                            <MessageSquare className="w-8 h-8 text-white drop-shadow-sm" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-bounce"></div>
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full border border-white dark:border-gray-900 animate-bounce delay-300"></div>
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-2 sm:mb-3">
                                        Welcome to PollChat
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-2">
                                        Connect with others instantly. Enter your details below to join the conversation.
                                    </p>
                                </div>

                                {/* Form */}
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <UserIcon className="w-4 h-4" />
                                            Your Name
                                        </label>
                                        <div className="relative group">
                                            <Input
                                                type="text"
                                                placeholder="Enter your display name"
                                                value={joinForm.name}
                                                onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                                                onKeyPress={handleKeyPress}
                                                className="h-11 sm:h-12 border-0 bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 rounded-xl px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 shadow-inner group-hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500/20"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Room ID Input */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            <HomeIcon className="w-4 h-4" />
                                            Room ID
                                        </label>
                                        <div className="relative group">
                                            <Input
                                                type="text"
                                                placeholder="Enter room identifier"
                                                value={joinForm.roomId}
                                                onChange={(e) => setJoinForm({ ...joinForm, roomId: e.target.value })}
                                                onKeyPress={handleKeyPress}
                                                className="h-11 sm:h-12 border-0 bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 rounded-xl px-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 shadow-inner group-hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500/20"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Join Button */}
                                    <div className="pt-2">
                                        <Button
                                            onClick={handleJoinRoom}
                                            className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            disabled={!joinForm.name.trim() || !joinForm.roomId.trim()}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span>Join Room</span>
                                                <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
                                            </div>
                                        </Button>
                                    </div>

                                    {/* Quick Tips */}
                                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                                        <div className="flex items-start gap-3">
                                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                                                Use the same Room ID to chat with specific people, or create a new one to start fresh!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative h-fit bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-950 dark:via-slate-900/50 dark:to-blue-950/30">
            {/* Enhanced Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Primary gradient patterns */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.03),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.03),transparent_50%)]"></div>
                
                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-20 w-24 h-24 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-32 h-32 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-40 w-20 h-20 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-xl animate-pulse delay-500"></div>
                
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.01)_1px,transparent_1px)]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 flex flex-col p-2 sm:p-3 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-3 sm:mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl blur-xl"></div>
                        
                        <div className="relative p-3 sm:p-4 lg:p-5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl border border-white/60 dark:border-gray-700/50 shadow-xl">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                    {/* Room Icon */}
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-md opacity-40 animate-pulse"></div>
                                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                                            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                                    </div>
                                    
                                    {/* Room Info */}
                                    <div className="space-y-0.5 min-w-0 flex-1">
                                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                                                Room: {user.roomId}
                                            </h1>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs font-medium text-green-700 dark:text-green-300">Live</span>
                                            </div>
                                        </div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                                            <span className="truncate">
                                                Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.name}</span>
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Right Controls */}
                                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                                    <UserListDialog users={users} currentUserId={user.id} roomId={user.roomId} />
                                    
                                    {/* Connection Status */}
                                    <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${isConnected
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-700/30'
                                        : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-700/30'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                                        <span className="text-xs uppercase tracking-wide hidden sm:inline">
                                            {isConnected ? 'Connected' : 'Reconnecting...'}
                                        </span>
                                    </div>

                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Sections - Responsive height */}
                    <div className="flex-1 flex flex-col relative min-h-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/10 to-transparent dark:via-slate-800/10 rounded-2xl"></div>
                        
                        <div className="relative z-10 flex-1 flex flex-col min-h-0">
                            <ChatSections messages={messages} onUpvote={handleUpvote} currentUserId={user.id} />

                            {/* Message Input */}
                            <div className="mt-2 sm:mt-2 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-indigo-500/8 to-purple-500/8 rounded-2xl blur-xl"></div>
                                
                                <div className="relative p-3 py-2 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl border border-white/60 dark:border-gray-700/50 shadow-xl">
                                    <div className="flex gap-2 sm:gap-3 lg:gap-4">
                                        {/* Input */}
                                        <div className="flex-1 relative group">
                                            <Input
                                                type="text"
                                                placeholder="Share your thoughts..."
                                                value={currentMessage}
                                                onChange={(e) => setCurrentMessage(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                disabled={!isConnected}
                                                maxLength={500}
                                                className="h-10 sm:h-11 lg:h-12 border-0 bg-gray-50 dark:bg-gray-800/70 focus:bg-white dark:focus:bg-gray-700 transition-all duration-300 rounded-xl px-3 sm:px-4 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 shadow-inner group-hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                        
                                        {/* Send Button */}
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!currentMessage.trim() || !isConnected}
                                            size="default"
                                            className="h-10 sm:h-11 lg:h-12 px-3 sm:px-4 lg:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </Button>
                                    </div>

            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};