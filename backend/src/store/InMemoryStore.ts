import { Chat, Store, UserId } from "./Store";
let globalChatId = 0;


// An Interface for Room
export interface Room {
    roomId: string;
    chats: Chat[]
}

/* 

An in-memory implementation of the Store interface.
This can be Replaced with a database or any other persistent storage mechanism.

Implemented using a Map where the key is the roomId and the value is the Room object.



*/
export class InMemoryStore implements Store {


    // The main store as a Map of RoomId : String to Room : RoomObject
    private store: Map<string, Room>;

    // Default Constructor to initialize the store as an empty Map
    constructor() {
        this.store = new Map<string, Room>()
    }



    // initialize a room if it doesn't exist already
    initRoom(roomId: string) {
        this.store.set(roomId, {
            roomId,
            chats: []
        });
    }



    // Get chats for a room with pagination support (limit and offset) 
    // Limits the number of chats returned and offsets the starting point
    getChats(roomId: string, limit: number, offset: number) {
        const room = this.store.get(roomId);
        if (!room) {
            return []
        }
        return room.chats.reverse().slice(0, offset).slice(-1 * limit);
    }


    // Add a chat to a room, initializing the room if it doesn't exist 
    // Adds a new chat object to the room's chat array
    addChat(userId: UserId, name: string, roomId: string, message: string) {
        if (!this.store.get(roomId)) {
            this.initRoom(roomId);
        }
        const room = this.store.get(roomId);
        if (!room) {
            return;
        }
        const chat = {
            id: (globalChatId++).toString(),
            userId,
            name,
            message,
            upvotes: []
        }
        room.chats.push(chat)
        return chat;
    }

    // Upvote a chat in a room by a user
    // Ensures that a user can only upvote a chat once
    upvote(userId: UserId, roomId: string, chatId: string) {
        const room = this.store.get(roomId);
        if (!room) {
            return 
        }
        // Todo: Make this faster
        const chat = room.chats.find(({id}) => id == chatId);

        if (chat) {
            if (chat.upvotes.find(x => x === userId)) {
                return chat;
            }
            chat.upvotes.push(userId);
        }
        return chat;
    }


    // Clear the entire store, removing all rooms and chats
    clearStore() {
        this.store.clear();
    }

    // Remove rooms that have no chats to free up memory 
    removeUnusedRooms() {
        this.store.forEach((room, roomId) => {
            if (room.chats.length === 0) {
                this.store.delete(roomId);
            }
        });
    }

}