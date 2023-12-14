#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd backend/podcast-index
node index.js &
cd ../..

# Wait a bit for the backend server to initialize (optional)
sleep 3

# Start the frontend
echo "Starting frontend..."
cd frontend
npm run dev
