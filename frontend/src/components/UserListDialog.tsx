import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface UserListDialogProps {
  users: Array<{ id: string; name: string }>;
  currentUserId?: string;
  roomId: string;
}

export const UserListDialog = ({ users, currentUserId, roomId }: UserListDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 px-3 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-200"
        >
          <span className="text-sm mr-2">👥</span>
          <span className="text-sm font-medium">{users.length}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-blue-600 dark:text-blue-400 text-xl">👥</span>
            Room Members
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            {users.length} member{users.length !== 1 ? 's' : ''} in <span className="font-medium text-gray-800 dark:text-gray-200">{roomId}</span>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-64">
          <div className="space-y-3 pr-4">
            {users.map((user) => {
              const isCurrentUser = user.id === currentUserId;
              return (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isCurrentUser 
                      ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800' 
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${
                    isCurrentUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {user.name}
                      </span>
                      {isCurrentUser && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        >
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.id}
                    </div>
                  </div>
                  
                  {isCurrentUser && (
                    <span className="text-blue-600 dark:text-blue-400 text-lg">👑</span>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        {users.length === 0 && (
          <div className="text-center py-8">
            <span className="text-6xl text-gray-300 dark:text-gray-600 mb-3 block">👥</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">No users in this room</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
