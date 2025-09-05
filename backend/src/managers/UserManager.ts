import { connection } from "websocket";
import { OutgoingMessage, SupportedMessage } from "../messages/outgoingMessages";


// This is a UserInterface representing a user in a room
// Each user has a name, a unique ID, and a connection object for WebSocket communication
interface User {
    name: string;
    id: string;
    conn: connection;
}

// This is a RoomInterface representing a chat room
// Has a list of users currently in the room
interface Room {
    users: User[]
}

export class UserManager {

    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>()
    }

    addUser(name: string, userId: string, roomId: string, socket: connection) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            })
        }
        this.rooms.get(roomId)?.users.push({
            id: userId,
            name,
            conn: socket
        })
        socket.on('close', (reasonCode, description) => {
            this.removeUser(roomId, userId);
        });

        // Send updated user list to all users in the room
        this.sendUserList(roomId);
    }

    removeUser(roomId: string, userId: string) {
        // console.log("removed user");
        const room = this.rooms.get(roomId);
        if (room) {
            room.users = room.users.filter(({ id }) => id !== userId);
            // Send updated user list to remaining users
            this.sendUserList(roomId);
        }
    }

    getUser(roomId: string, userId: string): User | null {
        const user = this.rooms.get(roomId)?.users.find((({ id }) => id === userId));
        return user ?? null;
    }

    broadcast(roomId: string, userId: string, message: OutgoingMessage) {
        const user = this.getUser(roomId, userId);
        if (!user) {
            // console.error("User not found");
            return;
        }

        const room = this.rooms.get(roomId);
        if (!room) {
            // console.error("Rom rom not found");
            return;
        }

        room.users.forEach(({ conn, id }) => {
            // Include the sender in the broadcast so they see their own messages
            // console.log("outgoing message " + JSON.stringify(message))
            conn.sendUTF(JSON.stringify(message))
        })
    }

    sendUserList(roomId: string) {

        const room = this.rooms.get(roomId);
        if (!room) {
            // console.error("Room not found");
            return;
        }

        const userList = room.users.map(user => ({
            id: user.id,
            name: user.name
        }));

        const message: OutgoingMessage = {
            type: SupportedMessage.UserList,
            payload: {
                roomId,
                users: userList
            }
        };

        room.users.forEach(({ conn }) => {
            conn.sendUTF(JSON.stringify(message));
        });
    }
}