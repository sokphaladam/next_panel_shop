#!/bin/bash
cd /var/www/next_panel_shop
git fetch origin deploy-local
if [ $(git rev-parse HEAD) != $(git rev-parse origin/deploy-local) ]; then
  echo "🔄 Changes detected, updating..."
  git pull origin deploy-local
  . ~/.nvm/nvm.sh && npm install --omit=dev
  . ~/.nvm/nvm.sh && npm run build
  . ~/.nvm/nvm.sh && pm2 stop next_panel_shop
  . ~/.nvm/nvm.sh && pm2 start npm --name next_panel_shop -- run start -- -H 0.0.0.0 -p 3000
  echo "✅ Updated successfully!!"
else
  echo "✅ No changes, skipping build."
fi
echo "Deployment finished at $(date)"