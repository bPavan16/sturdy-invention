export type UserId = string;

// ChatInterface representing a chat message
export interface Chat {
    id: string;
    userId: UserId;
    name: string;
    message: string;
    upvotes: UserId[]; // who has upvoited what 
}


// This is a Store interface that defines the methods for storing and retrieving chat data.
// Any class implementing this interface should provide concrete implementations for these methods.
// This allows for flexibility in choosing different storage mechanisms (e.g., in-memory, database, etc.)
export abstract class Store {
    constructor() {

    }
    initRoom(roomId: string) {

    }

    getChats(room: string, limit: number, offset: number) {

    }

    addChat(userId: UserId, name: string, room: string, message: string) {

    }

    upvote(userId: UserId, room: string, chatId: string) {

    }

}