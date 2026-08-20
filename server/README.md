# InterviewHub - Full Stack Interview Preparation Platform

## Project Overview

InterviewHub is a comprehensive full-stack interview preparation platform built with React, TypeScript, Node.js, Express, and MongoDB. It helps users prepare for technical interviews through quizzes, mock interviews, flashcards, daily challenges, and analytics.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- Recharts

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Zod + Joi validation
- Helmet, CORS, Morgan

## Architecture

```
Project Structure
├── frontend/ (existing React app)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── services/
│   └── package.json
├── server/ (new backend)
│   ├── src/
│   │   ├── config/          # Database and env config
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/       # Auth, validation, errors
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helpers
│   │   ├── validators/      # Joi schemas
│   │   ├── types/           # TypeScript types
│   │   ├── scripts/         # Seed script
│   │   ├── app.ts           # Express app
│   │   └── server.ts        # Entry point
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
```

## Features

### Authentication
- User registration and login
- JWT access and refresh tokens
- Password hashing with bcrypt
- Protected routes

### Question Bank
- Browse questions by category, difficulty, topic
- Search functionality
- Pagination
- Admin CRUD operations

### Quiz System
- Start quizzes with filters
- Server-side score calculation
- Quiz history
- Progress tracking

### Mock Interview
- Interview session management
- Answer submission
- Score calculation
- Feedback generation

### Bookmarks
- Save favorite questions
- Check bookmark status
- View bookmarked questions

### Flashcards
- Review flashcards
- Track progress (easy/review/difficult)
- Review count tracking

### Daily Challenge
- Daily question sets
- Progress tracking
- Prevent duplicate completion

### Analytics
- Performance overview
- Category breakdown
- Activity trends
- Accuracy tracking

### Achievements
- Automatic achievement unlocking
- Progress tracking

### Admin Panel
- User management
- Question management
- Platform statistics

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/interviewhub
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
AI_API_KEY=
```

## Installation

### Prerequisites
- Node.js v18+
- MongoDB v5+
- npm or yarn

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend Setup

```bash
npm install
npm run dev
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/refresh | Refresh access token |
| POST | /api/auth/logout | Logout user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/me | Get profile |
| PUT | /api/users/me | Update profile |
| PUT | /api/users/me/password | Change password |
| GET | /api/users/me/stats | Get user stats |

### Questions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/questions | Get questions (paginated) |
| GET | /api/questions/:id | Get question by ID |
| POST | /api/questions | Create question (admin) |
| PUT | /api/questions/:id | Update question (admin) |
| DELETE | /api/questions/:id | Delete question (admin) |

### Quizzes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/quizzes/start | Start new quiz |
| POST | /api/quizzes/:id/submit | Submit quiz |
| GET | /api/quizzes/history | Get quiz history |
| GET | /api/quizzes/results/:id | Get quiz result |

### Interviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/interviews/start | Start interview |
| POST | /api/interviews/:id/answer | Submit answer |
| POST | /api/interviews/:id/complete | Complete interview |
| GET | /api/interviews/history | Get history |
| GET | /api/interviews/:id | Get result |

### Bookmarks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bookmarks | Get bookmarks |
| POST | /api/bookmarks/:questionId | Add bookmark |
| DELETE | /api/bookmarks/:questionId | Remove bookmark |
| GET | /api/bookmarks/check/:questionId | Check bookmark status |

### Flashcards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/flashcards | Get flashcards |
| POST | /api/flashcards/:questionId/progress | Update progress |

### Daily Challenge
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/daily-challenge | Get daily challenge |
| POST | /api/daily-challenge/:questionId/complete | Complete question |
| GET | /api/daily-challenge/progress | Get progress |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/analytics/overview | Get overview |
| GET | /api/analytics/categories | Get category performance |
| GET | /api/analytics/activity | Get activity data |
| GET | /api/analytics/accuracy | Get accuracy trends |

### Achievements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/achievements | Get achievements |
| POST | /api/achievements/check | Check achievements |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/users | Get all users |
| GET | /api/admin/questions | Get all questions |
| POST | /api/admin/questions | Create question |
| PUT | /api/admin/questions/:id | Update question |
| DELETE | /api/admin/questions/:id | Delete question |
| GET | /api/admin/statistics | Get platform stats |

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

### Paginated Response
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Security

- Password hashing with bcrypt (12 salt rounds)
- JWT authentication with refresh tokens
- HTTP security headers via Helmet
- CORS configuration
- Rate limiting
- Input validation with Joi/Zod
- No plain-text passwords
- No sensitive data exposure

## Database Models

- **User**: Authentication and profile
- **Question**: Interview questions
- **QuizResult**: Quiz results
- **InterviewResult**: Mock interview results
- **Bookmark**: Saved questions
- **FlashcardProgress**: Flashcard review tracking
- **DailyChallenge**: Daily challenge questions
- **DailyChallengeProgress**: User daily progress
- **Achievement**: Achievement definitions
- **UserAchievement**: User unlocked achievements

## Testing

```bash
cd server
npm test
```

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-db-host:27017/interviewhub
JWT_SECRET=strong_production_secret
JWT_REFRESH_SECRET=strong_production_refresh_secret
CLIENT_URL=https://your-frontend-domain.com
```

### Platforms
- Render
- Railway
- Fly.io

## License

MIT
