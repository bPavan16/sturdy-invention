@echo off
echo 🚀 Setting up PollChat for Vercel deployment...

echo.
echo 📦 Installing dependencies...

echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)

echo.
echo 🔧 Building projects...

echo Building backend...
cd ..\backend
call npm run build
if errorlevel 1 (
    echo ❌ Backend build failed
    pause
    exit /b 1
)

echo Building frontend...
cd ..\frontend
call npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Deploy backend to Vercel first
echo 2. Note the backend URL (e.g., https://your-app.vercel.app)
echo 3. Update frontend/.env.production with: VITE_WEBSOCKET_URL=wss://your-backend-url.vercel.app
echo 4. Deploy frontend to Vercel
echo.
echo 💡 Tip: For better WebSocket support, consider deploying backend to Railway or Render
echo.
pause
