#!/usr/bin/env bash

set -e

echo "========================================="
echo "   KajLagbe Platform Environment Setup   "
echo "========================================="

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 20.0.0"
    exit 1
fi
echo "✓ Node.js $(node -v) detected"

# 2. Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not found. Attempting to install pnpm@9..."
    npm install -g pnpm@9
fi
echo "✓ pnpm $(pnpm -v) detected"

# 3. Environment files
if [ ! -f apps/api/.env ]; then
    echo "Creating apps/api/.env from .env.example..."
    cp apps/api/.env.example apps/api/.env
fi

if [ ! -f apps/web/.env ]; then
    echo "Creating apps/web/.env from .env.example..."
    cp apps/web/.env.example apps/web/.env
fi

# 4. Install dependencies
echo "Installing monorepo dependencies..."
pnpm install

# 5. Generate Prisma Client
echo "Generating Prisma Client..."
pnpm db:generate

echo "========================================="
echo "   KajLagbe setup completed successfully!"
echo "   Run 'pnpm dev' to start all services."
echo "========================================="

