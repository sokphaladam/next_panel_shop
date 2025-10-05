git fetch origin deploy-local
if [ $(git rev-parse HEAD) != $(git rev-parse origin/deploy-local) ]; then
  echo "🔄 Changes detected, updating..."
  git pull origin deploy-local
  npm install --omit=dev
  npm run build
  pm2 restart next_panel_shop
  echo "✅ Updated successfully!"
else
  echo "✅ No changes, skipping build."
fi
