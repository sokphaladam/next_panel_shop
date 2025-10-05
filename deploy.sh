#!/bin/bash
echo "🚀 Starting auto deploy at $(date)"

# Go to your project directory
cd /var/www/next_panel_shop

# Pull latest changes
git pull origin deploy-local

# Install dependencies (only new ones)
npm install --omit=dev

# Rebuild Next.js
npm run build

# Restart PM2 app
pm2 restart next_panel_shop

echo "✅ Deploy complete at $(date)"
