import { OutgoingMessage, SupportedMessage as OutgoingSupportedMessages } from "./messages/outgoingMessages";
import { server as WebSocketServer, connection } from "websocket"
import http from 'http';
import { UserManager } from "./managers/UserManager";
import { IncomingMessage, SupportedMessage } from "./messages/incomingMessage";
// import {dotenv} 

import { InMemoryStore } from "./store/InMemoryStore";

const server = http.createServer(function (request: any, response: any) {

    // Creates a simple HTTP server to handle health checks and CORS preflight requests 
    // Prints Date and request URL to the console for logging purposes
    console.log((new Date()) + ' Received request for ' + request.url);
    
    // Add CORS headers

    // Set CORS headers to allow requests from any origin
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Allow specific HTTP methods i.e GET, POST, OPTIONS
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    // Allow specific headers in requests i.e Content-Type
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests

    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    // Health check endpoint : to verify server is running and reachable
    if (request.url === '/health' || request.url === '/') {

        // Simple health check response : server is running and reachable
        response.writeHead(200, { 'Content-Type': 'application/json' });

        // Return a JSON response with status, message, and timestamp
        response.end(JSON.stringify({ 
            status: 'ok', 
            message: 'WebSocket server is running',
            timestamp: new Date().toISOString()
        }));


        return;
    }
    
    // For any other request, return 404 Not Found response
    response.writeHead(404);
    response.end();
});


server

// Port configuration either from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Creates instances of UserManager to manage user connections 
const userManager = new UserManager();

// This is a simple in-memory store for chat messages. This can be replaced with a database or any other persistent storage mechanism.
const store = new InMemoryStore();


// This starts the HTTP server and listens on the specified port
server.listen(PORT, function () {
    console.log((new Date()) + ` Server is listening on port ${PORT}`);
});

// Create the WebSocket server on top of the existing HTTP server
const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});


// Function to check if the origin of the request is allowed
function originIsAllowed(origin: string) {

    // Allow all origins in production for WebSocket connections
    // In production, you might want to restrict this to your frontend domain

    return true;
}

// Handle WebSocket connection requests 
wsServer.on('request', function (request) {
    // console.log("inside connect");

    // Validate the origin of the request if the origin is not allowed, reject the request
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        // console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    // Accept the connection and specify the protocol 
    var connection = request.accept('echo-protocol', request.origin);
    // console.log((new Date()) + ' Connection accepted.');

    // Handle incoming messages from the client
    connection.on('message', function (message) {

        // Todo add rate limitting logic here 
        if (message.type === 'utf8') {
            try {
                messageHandler(connection, JSON.parse(message.utf8Data));
            } catch (e) {

            }
        }
    });
});

// This is a message handler function that processes incoming messages from clients amd performs actions based on the message type

function messageHandler(ws: connection, message: IncomingMessage) {

    // If the message type is JoinRoom, add the user to the specified room and send the updated user list to all users in the room
    if (message.type == SupportedMessage.JoinRoom) {

        // console.log("inside join room")

        // Extract the payload from the message
        const payload = message.payload;

        // Add the user to the specified room
        userManager.addUser(payload.name, payload.userId, payload.roomId, ws);
    }

    // if the message type is SendMessage, add the chat message to the store and broadcast it to all users in the room
    if (message.type === SupportedMessage.SendMessage) {
        // console.log("inside send message")


        const payload = message.payload;
        const user = userManager.getUser(payload.roomId, payload.userId);

        // Check if the user exists in the room 
        if (!user) {
            // console.error("User not found in the db");
            return;
        }

        // Add the chat message to the store 
        let chat = store.addChat(payload.userId, user.name, payload.roomId, payload.message);

        // if chat is null return 
        if (!chat) {
            return;
        }

        // Create the outgoing message payload to be sent to clients
        // This includes the chat ID, room ID, message content, user name, and initial upvote count (0)

        const outgoingPayload: OutgoingMessage = {
            type: OutgoingSupportedMessages.AddChat,
            payload: {
                chatId: chat.id,
                roomId: payload.roomId,
                message: payload.message,
                name: user.name,
                upvotes: 0
            }
        }

        // broadcast the new chat message to all users in the room 
        userManager.broadcast(payload.roomId, payload.userId, outgoingPayload);
    }

    // If the message type is UpvoteMessage, upvote the specified chat message in the store and broadcast the updated upvote count to all users in the room
    if (message.type === SupportedMessage.UpvoteMessage) {
        const payload = message.payload;
        const chat = store.upvote(payload.userId, payload.roomId, payload.chatId);
        // console.log("inside upvote")
        if (!chat) {
            return;
        }

        // console.log("inside upvote 2")

        const outgoingPayload: OutgoingMessage = {
            type: OutgoingSupportedMessages.UpdateChat,
            payload: {
                chatId: payload.chatId,
                roomId: payload.roomId,
                upvotes: chat.upvotes.length
            }
        }

        // console.log("inside upvote 3")
        userManager.broadcast(payload.roomId, payload.userId, outgoingPayload);
    }
}