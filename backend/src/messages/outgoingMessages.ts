
export enum SupportedMessage {
    AddChat =  "ADD_CHAT",
    UpdateChat = "UPDATE_CHAT",
    UserList = "USER_LIST",
}

type MessagePayload = {
    roomId: string;
    message: string;
    name: string;
    upvotes: number;
    chatId: string;
}

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
