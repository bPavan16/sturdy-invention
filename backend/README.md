# PollChat Backend

This is the backend for the **PollChat** application, a real-time chat platform that supports WebSocket communication. The backend is built using **Node.js** and **TypeScript**, and it handles user connections, message broadcasting, upvotes, and room management.


## 📂 Project Structure

The backend is organized as follows:

```
backend/
├── src/
│   ├── index.ts          # Entry point of the backend server
│   ├── managers/
│   │   ├── UserManager.ts # Manages user connections and room logic
│   │   ├── MessageManager.ts # Handles message storage and upvotes
│   ├── store/
│   │   ├── InMemoryStore.ts # In-memory data storage for users and messages
│   ├── types/
│   │   ├── index.ts       # TypeScript types for messages, users, etc.
│   ├── utils/
│   │   ├── logger.ts      # Utility for logging
│   ├── config/
│   │   ├── env.ts         # Environment variable configuration
├── .env                  # Environment variables for development
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── README.md             # Documentation for the backend
```


## 🚀 Features

### 1. **Real-Time Communication**
- Uses WebSocket for real-time communication between clients.
- Supports broadcasting messages to all users in a room.

### 2. **Room Management**
- Users can join specific rooms using a `roomId`.
- Tracks users in each room and ensures proper message routing.

### 3. **Message Handling**
- Stores messages in memory for the duration of the server's runtime.
- Supports upvoting messages, with real-time updates to all users.

### 4. **User Management**
- Tracks connected users and their associated rooms.
- Cleans up disconnected users to prevent memory leaks.

### 5. **Environment Configuration**
- Uses `.env` files for environment-specific configurations (e.g., port, WebSocket URL).


## 🛠️ Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/bPavan16/pollchat-backend.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=8080
   NODE_ENV=development
   ```
   - `PORT`: The port on which the backend server will run.
   - `NODE_ENV`: The environment mode (`development` or `production`).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build and run the production server:
   ```bash
   npm run build
   npm start
   ```


## 📡 API Endpoints

### WebSocket
- **URL**: `ws://localhost:8080`
- **Supported Messages**:
  - `JoinRoom`: Adds a user to a room.
  - `SendMessage`: Sends a message to all users in the room.
  - `UpvoteMessage`: Upvotes a specific message.


## 🛠️ Environment Variables

The backend uses the following environment variables:

| Variable   | Description                          | Default Value |
|------------|--------------------------------------|---------------|
| `PORT`     | The port on which the server runs    | `8080`        |
| `NODE_ENV` | The environment mode (`dev/prod`)    | `development` |


## 🧩 Scripts

### Development
- **Start the development server**:
  ```bash
  npm run dev
  ```

### Production
- **Build the project**:
  ```bash
  npm run build
  ```
- **Run the production server**:
  ```bash
  npm start
  ```

### Linting
- **Run ESLint**:
  ```bash
  npm run lint
  ```


## 🛠️ Technologies Used

- **Node.js**: Backend runtime.
- **TypeScript**: Type-safe development.
- **WebSocket**: Real-time communication.
- **dotenv**: Environment variable management.



## 🐛 Troubleshooting

### 1. **WebSocket Connection Issues**
- Ensure the backend is running on the correct port.
- Check if the WebSocket URL matches the frontend configuration.

### 2. **Environment Variable Issues**
- Ensure the `.env` file is correctly configured.
- Restart the server after making changes to `.env`.

### 3. **Memory Usage**
- The backend uses an in-memory store. For production, consider using a database like Redis or MongoDB.


## 📦 Deployment

### Deploy to Vercel
1. Push the backend code to a GitHub repository.
2. Import the repository into Vercel.
3. Set the root directory to backend.
4. Add environment variables in the Vercel dashboard:
   - `PORT`: `8080`
   - `NODE_ENV`: `production`
5. Deploy the backend.


## 📜 License

This project is licensed under the MIT License.


## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.


## 📧 Contact

- **GitHub**: [bPavan16](https://github.com/bPavan16)


Happy coding! 🚀
