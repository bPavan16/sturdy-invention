// Message types for WebSocket communication
export enum IncomingSupportedMessage {
  JoinRoom = "JOIN_ROOM",
  SendMessage = "SEND_MESSAGE",
  UpvoteMessage = "UPVOTE_MESSAGE",
}

export enum OutgoingSupportedMessage {
  AddChat = "ADD_CHAT",
  UpdateChat = "UPDATE_CHAT",
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
