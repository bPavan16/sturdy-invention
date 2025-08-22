# PollChat - Vercel Deployment Guide

This is a real-time chat application with message upvoting built with React + TypeScript (frontend) and Node.js + WebSocket (backend).

## 🚀 Live Demo

- **Frontend**: Will be deployed to Vercel
- **Backend**: Will be deployed to Vercel (for WebSocket support)

## 📁 Project Structure

```
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   ├── package.json
│   ├── vercel.json
│   └── .env.production
└── backend/           # Node.js + WebSocket server
    ├── src/
    ├── package.json
    ├── vercel.json
    └── .env.production
```

## 🔧 Environment Variables

### Frontend (.env.production)
```
VITE_WEBSOCKET_URL=wss://your-backend-url.vercel.app
```

### Backend (.env.production)
```
NODE_ENV=production
```

## 📦 Deployment Steps

### 1. Deploy Backend First

1. Navigate to the backend directory
2. Push to GitHub repository
3. Import the project in Vercel dashboard
4. Set the root directory to `backend`
5. Vercel will automatically detect it as a Node.js project
6. Deploy and note the URL (e.g., `your-backend-name.vercel.app`)

### 2. Deploy Frontend

1. Update `frontend/.env.production` with your backend URL:
   ```
   VITE_WEBSOCKET_URL=wss://your-backend-name.vercel.app
   ```
2. Navigate to the frontend directory
3. Import as a new project in Vercel dashboard
4. Set the root directory to `frontend`
5. Vercel will detect it as a Vite project
6. Add environment variable in Vercel dashboard:
   - Key: `VITE_WEBSOCKET_URL`
   - Value: `wss://your-backend-name.vercel.app`
7. Deploy

## 🛠 Manual Deployment Commands

### Backend
```bash
cd backend
npm install
npm run build
npm start  # For local testing
```

### Frontend
```bash
cd frontend
npm install
npm run build
npm run preview  # For local testing
```

## 🔍 Features

- ✅ Real-time messaging with WebSocket
- ✅ Message upvoting system
- ✅ User list with online status
- ✅ Dark/Light theme switching
- ✅ Responsive design
- ✅ Three-column message layout (All, Popular, Top)
- ✅ Modern UI with shadcn/ui components
- ✅ Smooth scrolling with ScrollArea
- ✅ Environment-based configuration

## 🌐 WebSocket Connection

The app automatically connects to the WebSocket server based on the environment:
- **Development**: `ws://localhost:8080`
- **Production**: `wss://your-backend-url.vercel.app`

## 🎨 UI Components

Built with:
- **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Lucide React** for icons
- **next-themes** for theme switching

## 🏗 Backend Architecture

- **WebSocket Server** with `websocket` library
- **TypeScript** for type safety
- **In-memory storage** for messages and users
- **Real-time broadcasting** to all room members
- **User management** with automatic cleanup

## 🔐 Production Considerations

1. **CORS**: Currently allows all origins - restrict in production
2. **Rate Limiting**: Add rate limiting for message sending
3. **Authentication**: Consider adding user authentication
4. **Database**: Replace in-memory storage with persistent database
5. **Monitoring**: Add logging and monitoring
6. **SSL**: Ensure HTTPS/WSS in production

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet and desktop optimized
- ✅ Touch-friendly interfaces
- ✅ Flexible layouts

## 🚨 Known Limitations

- **Vercel WebSocket**: Vercel has limited WebSocket support. Consider using:
  - **Railway** or **Render** for backend deployment
  - **Socket.io** with fallback mechanisms
  - **Supabase Realtime** for production WebSocket needs

## 🛟 Alternative Deployment Options

### Backend Alternatives:
1. **Railway**: Better WebSocket support
2. **Render**: Full WebSocket support
3. **Heroku**: Reliable for WebSocket apps
4. **AWS EC2/ECS**: Full control

### Frontend:
- Vercel works perfectly for the React frontend

## 📞 Support

If you encounter issues with WebSocket connections on Vercel, consider deploying the backend to Railway or Render instead, which have better WebSocket support.
