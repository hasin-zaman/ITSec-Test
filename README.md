# Task Manager API - Backend

A secure RESTful API for a Task Manager system built with Node.js, Express, and MongoDB. Features JWT authentication with both access and refresh tokens.

## 🚀 Features

- **User Authentication**: JWT-based auth with access & refresh tokens
- **CRUD Operations**: Full task management (Create, Read, Update, Delete)
- **Security**: Password hashing, token validation, input sanitization
- **Clean Architecture**: Separated routes, controllers, services, and models
- **Error Handling**: Comprehensive error handling and validation
- **MongoDB Integration**: Cloud MongoDB Atlas with Mongoose ODM

## 📋 API Endpoints

### Authentication Routes (No token required)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user (returns access + refresh tokens)

### Task Routes (All require JWT token)
- `POST /tasks` - Create a new task
- `GET /tasks` - Get all tasks for authenticated user
- `GET /tasks/:id` - Get a single task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Postman or similar API testing tool

### 1. Clone and Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongo_atlast_connection_url
JWT_SECRET=your_jwt_secret_key_here_change_this
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_change_this
PORT=5000
```

### 3. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## 📁 Project Structure
```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task CRUD operations
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── validation.js       # Request validation
├── models/
│   ├── Task.js             # Task schema
│   └── User.js             # User schema
├── routes/
│   ├── auth.js             # Authentication routes
│   └── tasks.js            # Task routes
├── services/
│   ├── authService.js      # Auth business logic
│   └── taskService.js      # Task business logic
├── .env                    # Environment variables
├── package.json
└── server.js              # Application entry point
```

## 🔐 Authentication Flow

### Registration
```json
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```json
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Response (Both endpoints)
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "username": "testuser",
    "email": "test@example.com"
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

## 📝 Task Management

### Task Schema
```json
{
  "title": "Task title (required)",
  "description": "Task description (optional)",
  "status": "pending|in-progress|completed"
}
```

### Create Task
```json
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete security assessment",
  "description": "Perform penetration testing on web application",
  "status": "pending"
}
```

### Protected Routes
All task routes require JWT token in Authorization header:
```
Authorization: Bearer <your_access_token_here>
```

## 🧪 Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

### 2. Login to Get Tokens
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### 3. Create a Task (with token)
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_access_token>" \
  -d '{"title": "Security audit", "description": "Conduct security assessment", "status": "pending"}'
```

### 4. Get All Tasks
```bash
curl -H "Authorization: Bearer <your_access_token>" http://localhost:5000/tasks
```

## 🔧 Technical Details

### Security Features
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Access tokens (15min) + Refresh tokens (7 days)
- **Input Validation**: Request body sanitization and validation
- **CORS**: Enabled for cross-origin requests

### Database Models
- **User**: username, email, password (hashed), timestamps
- **Task**: title, description, status, user reference, timestamps

### Error Handling
- Comprehensive error messages
- HTTP status codes
- MongoDB error handling
- JWT validation errors

## 🚨 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Check your Atlas credentials in `.env`
2. **JWT Errors**: Verify token in Authorization header
3. **Validation Errors**: Ensure request body matches required schema
4. **Port Conflicts**: Change PORT in `.env` if 5000 is occupied

## 👨‍💻 Developer

Built with Node.js, Express, MongoDB, and JWT authentication following security best practices.

---

**Server Status**: ✅ Running on http://localhost:5000  
**Database**: ✅ MongoDB Atlas Connected  
**Authentication**: ✅ JWT with Refresh Tokens  
**API**: ✅ RESTful endpoints ready for frontend integration

# Task Manager App - Frontend

A simple Task Manager built with **React 19**, **RTK Query**, **Tailwind CSS 4**, and **Shadcn UI**.  
Supports authentication (register/login), task CRUD, and protected routing.

---

## Features

- **Authentication**
  - Register & Login pages
  - JWT stored in localStorage
  - Protected routes (only accessible if logged in)
- **Tasks**
  - Add, view, update, delete tasks
  - Fetch single task
- **UI**
  - Styled with Tailwind CSS & Shadcn UI components
  - Toast notifications with Sonner
- **State Management**
  - Redux Toolkit + RTK Query
  - API integration with backend at `http://localhost:5000`

---

## Project Structure

src/
├─ pages/
│ ├─ LoginPage.jsx
│ ├─ RegisterPage.jsx
│ └─ TasksPage.jsx
├─ store/
│ ├─ store.js
│ ├─ apiSlice.js
│ ├─ authApi.js
│ └─ tasksApi.js
├─ components/
│ └─ ui/ (buttons, inputs, cards, toast)
└─ App.jsx


---

## Installation

```bash
git clone <repo-url>
cd frontend
npm install

Tech Stack

React 19 + JSX

Redux Toolkit + RTK Query

Tailwind CSS 4

Shadcn UI Components

Sonner Toast Notifications

React Router DOM (v6)

LocalStorage for token persistence

