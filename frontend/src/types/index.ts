// Message types for WebSocket communication
//@ts-expect-error I dont know why 

export enum IncomingSupportedMessage {
  JoinRoom = "JOIN_ROOM",
  SendMessage = "SEND_MESSAGE",
  UpvoteMessage = "UPVOTE_MESSAGE",
}
//@ts-expect-error I dont know why
export enum OutgoingSupportedMessage {
  AddChat = "ADD_CHAT",
  UpdateChat = "UPDATE_CHAT",
  UserList = "USER_LIST",
}

export type IncomingMessage = {
  type: IncomingSupportedMessage.JoinRoom;
  payload: {
    name: string;
    userId: string;
    roomId: string;
  };
} | {
  type: IncomingSupportedMessage.SendMessage;
  payload: {
    userId: string;
    roomId: string;
    message: string;
  };
} | {
  type: IncomingSupportedMessage.UpvoteMessage;
  payload: {
    userId: string;
    roomId: string;
    chatId: string;
  };
};

export type OutgoingMessage = {
  type: OutgoingSupportedMessage.AddChat;
  payload: {
    roomId: string;
    message: string;
    name: string;
    upvotes: number;
    chatId: string;
  };
} | {
  type: OutgoingSupportedMessage.UpdateChat;
  payload: {
    roomId?: string;
    message?: string;
    name?: string;
    upvotes?: number;
    chatId?: string;
  };
} | {
  type: OutgoingSupportedMessage.UserList;
  payload: {
    roomId: string;
    users: Array<{
      id: string;
      name: string;
    }>;
  };
};

export interface ChatMessage {
  id: string;
  userId?: string;
  name: string;
  message: string;
  upvotes: number;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  roomId: string;
}
