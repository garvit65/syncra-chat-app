# 💬 Syncra Chat App

A full-stack real-time chat application built using **MERN + Socket.io**.

## 🚀 Features
- User authentication (JWT)
- Direct & group messaging
- Real-time communication using sockets
- File and image sharing
- Channel creation and management
- Responsive UI built with React and TailwindCSS

## 🛠️ Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js
- Socket.io
- Zustand (State Management)

## ⚙️ Setup Instructions
```bash
# Clone the repository
git clone https://github.com/garvit65/syncra-chat-app.git

# Navigate
cd syncra-chat-app

# Install dependencies
npm install

# Create .env file with your configuration
MONGO_URL=...
JWT_KEY=...
ORIGIN=http://localhost:5173

# Run backend
npm run server

# Run frontend
npm run dev
