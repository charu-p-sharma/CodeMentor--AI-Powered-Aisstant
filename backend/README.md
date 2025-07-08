# CodeMentor – AI Powered Coding Assistant

An AI-powered chatbot assistant inspired by ChatGPT, built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with TypeScript for robust backend typing.

## ✨ Features

- Chat with OpenAI-based AI assistant.
- Messages stored securely in MongoDB.
- User authentication with JWT (token in HTTP-only signed cookies).
- Password hashing using bcrypt.
- Fully modular structure with `controllers`, `routes`, `models`, `utils`.
- `.env` based secret management.
- Supports CRUD for chat messages (add, delete, retrieve).
- Secure with Middleware Chains.

## 📦 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose
- **Frontend**: React.js, Material UI (to be developed)
- **AI**: OpenAI GPT API

## 🛡 Security Implementations

- JWT + HTTP-only signed cookies
- Password encryption using bcrypt
- Environment variable management via dotenv
- Strict TypeScript typing

## ⚙ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/codementor-ai-assistant.git

# 2. Navigate to backend and install dependencies
cd backend
npm install

# 3. Set up your .env
cp .env.example .env
# Add your secrets and MongoDB URL

# 4. Start development server
npm run dev
