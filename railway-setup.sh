#!/bin/bash
# Script de setup para Railway - ANTHROSCOPE PRO
# Este script configura automaticamente la base de datos al primer deploy

echo "=========================================="
echo "ANTHROSCOPE PRO - Railway Setup"
echo "=========================================="

# Esperar a que MySQL este listo
echo "Waiting for MySQL..."
sleep 5

# Push schema to database
echo "Syncing database schema..."
npm run db:push

# Seed initial data (plans)
echo "Seeding plans data..."
npx tsx db/seed.ts

echo "=========================================="
echo "Setup complete! Ready for production."
echo "=========================================="

# Start the server
npm start
