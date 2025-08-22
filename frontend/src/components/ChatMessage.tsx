import { ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import type { ChatMessage } from '../types';

interface ChatMessageProps {
    message: ChatMessage;
    onUpvote: (messageId: string) => void;
    currentUserId?: string;
}

export const ChatMessageComponent = ({ message, onUpvote, currentUserId }: ChatMessageProps) => {

    // This is to display the timestamp
    const timeStr = message.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const isOwnMessage = currentUserId && message.userId === currentUserId;

    return (
        <div className="group relative px-2 py-2 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200 border border-gray-400/50 dark:border-gray-700/50">
            
            {/* User Info */}
            <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                    isOwnMessage 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                    {message.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 gap-3 p-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {message.name}
                        </span>
                        {isOwnMessage && (
                            <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                                You
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {timeStr}
                    </div>
                </div>
                
                {/* Upvote Button */}
                <div className="flex items-center gap-1">
                    {message.upvotes > 0 && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 mr-1">
                            {message.upvotes}
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUpvote(message.id)}
                        className="h-7 w-7 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    >
                        <ThumbsUp className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            {/* Message Content */}
            <div className="ml-11 pr-2">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {message.message}
                </p>
            </div>
        </div>
    );
};
