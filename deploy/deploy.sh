#!/bin/bash

echo "🚀 Deploying PollChat to Vercel..."

# Deploy backend first
echo "📦 Deploying backend..."
cd backend
vercel --prod

# Get the backend URL (you'll need to update this manually)
echo "⚠️  Please note your backend URL from the deployment above"
echo "📝 Update frontend/.env.production with your backend URL"

# Deploy frontend
echo "📦 Deploying frontend..."
cd ../frontend
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Don't forget to update the VITE_WEBSOCKET_URL in your frontend environment"
