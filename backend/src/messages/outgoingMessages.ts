
// Define the types of messages that can be sent from the server to clients
// only these types are allowed
export enum SupportedMessage {
    AddChat =  "ADD_CHAT",
    UpdateChat = "UPDATE_CHAT",
    UserList = "USER_LIST",
}

// Payload structure for messages sent to clients
type MessagePayload = {
    roomId: string;
    message: string;
    name: string;
    upvotes: number;
    chatId: string;
}

// OutgoingMessage can be one of several types, each with its own payload structure
export type OutgoingMessage = {
    type: SupportedMessage.AddChat,
    payload: MessagePayload
} | {
    type: SupportedMessage.UpdateChat,
    payload: Partial<MessagePayload>
} | {
    type: SupportedMessage.UserList,
    payload: {
        roomId: string;
        users: Array<{
            id: string;
            name: string;
        }>;
    }
}
