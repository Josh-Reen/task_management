# Task Manager API Documentation

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Environment Configuration](#environment-configuration)
3. [API Endpoints](#api-endpoints)
4. [Database Schema](#database-schema)
5. [Error Handling](#error-handling)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Installation Steps
```bash
# Clone the repository (if using Git)
git clone [repository-url]
cd task_management_api

# Or create project directory
mkdir task_management_api
cd task_management_api

# Initialize project
npm init -y

# Install dependencies
npm install express cors sequelize sqlite3 bcryptjs jsonwebtoken dotenv winston

# Install dev dependencies
npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken ts-node nodemon @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```

### Project Structure
```
task_management_api/
├── src/
│   ├── config/
│   │   ├── config.ts
│   │   └── database.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── task.controller.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── task.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── task.routes.ts
│   ├── utils/
│   │   └── logger.ts
│   └── index.ts
├── .env
├── package.json
└── tsconfig.json
```

### Running the Application
```bash
# Development mode
npm run dev

# Build and run production
npm run build
npm start
```

## Environment Configuration

Create a `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=your-secret-key-here
DB_PATH=./database.sqlite
LOG_LEVEL=info
```

## API Endpoints

### Authentication

#### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "yourpassword123"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "user": {
      "id": 1,
      "username": "testuser",
      "password": "[hashed-password]",
      "createdAt": "2025-02-02T15:12:17.141Z",
      "updatedAt": "2025-02-02T15:12:17.141Z"
    },
    "token": "[jwt-token]"
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "yourpassword123"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "user": {
      "id": 1,
      "username": "testuser"
    },
    "token": "[jwt-token]"
  }
  ```

### Tasks

#### Create Task
- **URL**: `/api/tasks`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer [jwt-token]
  ```
- **Body**:
  ```json
  {
    "title": "Complete project documentation",
    "completed": false
  }
  ```
- **Success Response** (201):
  ```json
  {
    "id": 1,
    "title": "Complete project documentation",
    "completed": false,
    "userId": 1,
    "createdAt": "2025-02-02T15:15:00.000Z",
    "updatedAt": "2025-02-02T15:15:00.000Z"
  }
  ```

#### Get All Tasks
- **URL**: `/api/tasks`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer [jwt-token]
  ```
- **Success Response** (200):
  ```json
  [
    {
      "id": 1,
      "title": "Complete project documentation",
      "completed": false,
      "userId": 1,
      "createdAt": "2025-02-02T15:15:00.000Z",
      "updatedAt": "2025-02-02T15:15:00.000Z"
    }
  ]
  ```

#### Update Task
- **URL**: `/api/tasks/:id`
- **Method**: `PUT`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer [jwt-token]
  ```
- **Body**:
  ```json
  {
    "title": "Updated task title",
    "completed": true
  }
  ```
- **Success Response** (200):
  ```json
  {
    "id": 1,
    "title": "Updated task title",
    "completed": true,
    "userId": 1,
    "createdAt": "2025-02-02T15:15:00.000Z",
    "updatedAt": "2025-02-02T15:16:00.000Z"
  }
  ```

#### Delete Task
- **URL**: `/api/tasks/:id`
- **Method**: `DELETE`
- **Headers**: 
  ```
  Authorization: Bearer [jwt-token]
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Database Schema

### Users Table
```sql
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);
```

### Tasks Table
```sql
CREATE TABLE Tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  userId INTEGER NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id)
);
```

## Error Handling

### Common Error Responses

#### Authentication Errors
- **401 Unauthorized**:
  ```json
  {
    "error": "Please authenticate."
  }
  ```
- **400 Bad Request** (Login/Register):
  ```json
  {
    "error": "Unable to login"
  }
  ```

#### Task Errors
- **404 Not Found**:
  ```json
  {
    "error": "Task not found"
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "error": "Unable to create task"
  }
  ```

  # Task Management Application

A Vue 3 + TypeScript task management application with authentication and task tracking capabilities.

## Features

- 🔐 User Authentication (Register/Login)
- ✅ Task Management
  - Create new tasks
  - Update task status
  - Track task progress
- 📱 Responsive Design
- 🔒 JWT Token Authentication
- 💻 TypeScript Support

## Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Project Setup

### 1. Clone the repository and install dependencies

```bash
# Clone the project (if using git)
git clone [repository-url]
cd task-management

# Or create project directory
mkdir task-management
cd task-management

# Create project structure
./setup.sh  # (Use the setup script provided earlier)

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL="http://0.0.0.0:8000/api"
```

### 3. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at:
- Local: http://0.0.0.0:8000
- Network: http://your-ip-address:8000

## Project Structure

```
task-management/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   └── tasks/
│   │       ├── TaskForm.vue
│   │       ├── TaskList.vue
│   │       └── TaskCard.vue
│   ├── composables/
│   │   ├── useAuth.ts
│   │   └── useTasks.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── tasks.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   └── task.types.ts
│   ├── styles/
│   │   └── main.css
│   ├── App.vue
│   └── main.ts
└── ...
```

## API Endpoints

The application expects the following API endpoints:

### Authentication

```
POST /api/auth/register
- Request: { email: string, password: string, name?: string }
- Response: { user: User, token: string }

POST /api/auth/login
- Request: { email: string, password: string }
- Response: { user: User, token: string }
```

### Tasks

```
GET /api/tasks
- Headers: Authorization: Bearer <token>
- Response: Task[]

POST /api/tasks
- Headers: Authorization: Bearer <token>
- Request: { title: string, description?: string }
- Response: Task

PATCH /api/tasks/:id
- Headers: Authorization: Bearer <token>
- Request: { status?: TaskStatus, title?: string, description?: string }
- Response: Task
```

## Type Definitions

### User

```typescript
interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: string;
}
```

### Task

```typescript
type TaskStatus = 'todo' | 'in_progress' | 'completed';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
```

## Development

### Adding New Features

1. Create new components in the appropriate directory
2. Add types to `types/` directory
3. Create/update services in `services/` directory
4. Use composables for shared logic

### Code Style

- Use TypeScript for all new files
- Follow Vue 3 Composition API patterns
- Use CSS variables for styling
- Keep components small and focused

## Production Deployment

1. Update the `.env` file with production API URL
2. Build the application:
```bash
npm run build
```
3. The built files will be in the `dist/` directory
4. Deploy the contents of `dist/` to your hosting service

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if the API server is running
   - Verify API_BASE_URL in .env file
   - Check network access permissions

2. **TypeScript Errors**
   - Run `npm run type-check`
   - Ensure all types are properly defined
   - Check import paths

3. **Network Access Issues**
   - Verify firewall settings
   - Check port availability
   - Confirm network interface configuration

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify network requests in browser DevTools
3. Ensure all environment variables are set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Add your license information here]