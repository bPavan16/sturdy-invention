import { useMemo } from 'react';
import { MessageCircle, Crown } from 'lucide-react';
import { ChatMessageComponent } from './ChatMessage';
import type { ChatMessage } from '../types';

interface ChatSectionsProps {
  messages: ChatMessage[];
  onUpvote: (messageId: string) => void;
  currentUserId?: string;
}

export const ChatSections = ({ messages, onUpvote, currentUserId }: ChatSectionsProps) => {
  // Create filtered and sorted message lists
  const { allMessages, highUpvoteMessages, highestUpvoteMessage } = useMemo(() => {
    // All messages sorted by timestamp (newest first)
    const allMessages = [...messages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    // Messages with upvotes >= 1 sorted by upvotes (highest first)
    const highUpvoteMessages = messages
      .filter(msg => msg.upvotes >= 1)
      .sort((a, b) => b.upvotes - a.upvotes);
    
    // Single message with highest upvotes
    const highestUpvoteMessage = messages.length > 0 
      ? messages.reduce((prev, current) => 
          current.upvotes > prev.upvotes ? current : prev
        )
      : null;

    return {
      allMessages,
      highUpvoteMessages,
      highestUpvoteMessage: highestUpvoteMessage && highestUpvoteMessage.upvotes > 0 ? highestUpvoteMessage : null
    };
  }, [messages]);

  const renderMessagesList = (messagesList: ChatMessage[], emptyMessage: string) => (


    <div className="h-[470px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {messagesList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <MessageCircle className="w-8 h-8 mb-3 opacity-40" />
          <p className="text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-1 p-3">
          {messagesList.map((message) => (
            <ChatMessageComponent
              key={message.id}
              message={message}
              onUpvote={onUpvote}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Sleek Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* All Messages Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Thin Header */}
          <div className="px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All Messages</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                {allMessages.length}
              </span>
            </div>
          </div>
          {renderMessagesList(allMessages, "Start chatting...")}
        </div>

        {/* Popular Messages Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Thin Header */}
          <div className="px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular</span>
              </div>
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                {highUpvoteMessages.length}
              </span>
            </div>
          </div>
          {renderMessagesList(highUpvoteMessages, "No popular messages yet")}
        </div>

        {/* Top Message Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Thin Header */}
          <div className="px-4 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Message</span>
              </div>
              {highestUpvoteMessage && (
                <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full font-medium">
                  {highestUpvoteMessage.upvotes} votes
                </span>
              )}
            </div>
          </div>
          <div className="h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {!highestUpvoteMessage ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Crown className="w-8 h-8 mb-3 opacity-40" />
                <p className="text-sm">No top message yet</p>
              </div>
            ) : (
              <div className="p-3">
                <div className="relative p-3 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50">
                  <div className="absolute -top-1 -right-1">
                    <Crown className="w-4 h-4 text-yellow-500" />
                  </div>
                  <ChatMessageComponent
                    key={highestUpvoteMessage.id}
                    message={highestUpvoteMessage}
                    onUpvote={onUpvote}
                    currentUserId={currentUserId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
