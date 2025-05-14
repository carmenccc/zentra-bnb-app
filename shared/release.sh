#!/bin/bash

# Exit on any error
set -e

# Step 1: Bump version, build, and publish
npm version patch
npm run build
npm publish --access public

# Step 2: Update frontend and backend
cd ../frontend
npm install @zentra/shared@latest
cd ../backend
npm install @zentra/shared@latest

echo "✅ Shared package published and updated in frontend and backend."
