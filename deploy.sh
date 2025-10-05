#!/bin/bash
echo "Pulling latest code..."
git pull origin deploy-local
echo "Installing dependencies..."
npm install
echo "Building app..."
npm run build
echo "Restarting PM2..."
pm2 restart next_panel_shop
echo "✅ Deploy complete!"
