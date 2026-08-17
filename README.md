# CodeLens — AI Code Reviewer

> An AI-powered code review platform that analyzes source code, identifies potential bugs, evaluates code quality and complexity, and provides actionable suggestions for improvement.

**CodeLens** is a full-stack web application designed to help developers understand and improve their code using AI-assisted code reviews. It provides an interactive code editor, multi-language support, secure authentication, personalized usage limits, and structured review results.

---

## Features

### AI-Powered Code Review

* Analyze source code using AI.
* Identify potential bugs and logical issues.
* Generate actionable improvement suggestions.
* Evaluate code quality.
* Analyze time and space complexity.
* Generate improved versions of submitted code.
* Receive structured review results.

### Interactive Code Editor

* Monaco Editor integration.
* Syntax highlighting.
* Multiple programming language support.
* Predefined starter code for supported languages.
* Responsive editor interface.
* Loading shimmer while review results are being generated.

### Supported Languages

Currently supported:

* Java
* Python
* C
* C++
* C#
* JavaScript
* Go
* Rust

### Authentication & Security

* User registration and login.
* Password hashing with bcrypt.
* JWT-based authentication.
* Protected backend routes.
* Authenticated API requests.
* Environment variables for sensitive credentials.
* User-specific request tracking.

### API Rate Limiting

* Restricts users to a maximum of **5 code reviews per day**.
* Prevents excessive API usage.
* Tracks daily review usage for each authenticated user.

### User Profile

Users can view:

* Name
* Email
* Reviews made today
* Logout option

### Modern UI

* Responsive design for desktop, tablet and mobile.
* Light and dark themes.
* Responsive navigation menu.
* Clean developer-focused interface.
* Tailwind CSS styling.
* Mobile-friendly code review experience.

---

## Tech Stack

### Frontend

| Technology        | Purpose                 |
| ----------------- | ----------------------- |
| React.js          | UI development          |
| Vite              | Frontend tooling        |
| React Router      | Client-side routing     |
| Redux Toolkit     | Global state management |
| Tailwind CSS      | Styling & responsive UI |
| Monaco Editor     | Code editor             |
| Font Awesome      | Icons                   |
| Axios/API service | Backend communication   |

### Backend

| Technology    | Purpose                   |
| ------------- | ------------------------- |
| Node.js       | Runtime environment       |
| Express.js    | REST API                  |
| MongoDB Atlas | Database                  |
| Mongoose      | MongoDB ODM               |
| JWT           | Authentication            |
| bcrypt        | Password hashing          |
| Gemini API    | AI-powered code analysis  |
| dotenv        | Environment configuration |
| CORS          | Cross-origin requests     |

---

## Project Architecture

```text
CodeLens/
│
├── backend/
│   ├── config/
│   │   ├── apiConfig.js
│   │   └── dbConfig.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── reviewController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── rateLimitMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── services/
│   │   └── apiService.js
│   │
│   ├── .env.example
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── app/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── data/
│       │   ├── layout/
│       │   ├── pages/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── slices/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       │
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

## How It Works

```text
User
  │
  ▼
React Frontend
  │
  │ JWT Authentication
  ▼
Express Backend
  │
  ├── Authentication Middleware
  │
  ├── Rate Limit Middleware
  │
  ▼
Review Controller
  │
  ▼
AI Service
  │
  ▼
Gemini API
  │
  ▼
Structured Code Review
  │
  ▼
React Review Panel
```

### Review Flow

1. User logs into CodeLens.
2. Backend authenticates the user using JWT.
3. User selects a programming language.
4. User writes or pastes code into Monaco Editor.
5. User submits the code for review.
6. Backend validates the authenticated request.
7. Daily request limit is checked.
8. Code is sent to the AI service.
9. AI analyzes the submitted code.
10. Structured review results are returned.
11. Frontend displays the analysis in the review panel.

---

## Authentication Flow

CodeLens uses JWT-based authentication.

```text
Signup
   ↓
Password Hashing
   ↓
MongoDB
   ↓
Login
   ↓
JWT Token
   ↓
Authenticated Requests
   ↓
Protected Routes
```

Passwords are never stored in plain text.

Sensitive values such as:

* Gemini API key
* MongoDB connection string
* JWT secret

are stored using environment variables and are **not committed to GitHub**.

---

## Daily Usage Limitation

To prevent excessive API usage, each authenticated user can make:

```text
5 code reviews / day
```

The backend checks the user's review count before processing a request.

```text
Request
   ↓
JWT Verification
   ↓
Check Today's Usage
   ↓
≤ 5 requests → Process Review
   │
   └── Limit reached → Reject Request
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-code-reviewer.git
```

```bash
cd ai-code-reviewer
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
```

> Never commit your `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

The backend should now be running locally.

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend/vite-project
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

---

## Environment Variables

Create:

```text
backend/.env
```

Example:

```env
GEMINI_API_KEY=
MONGO_URI=
JWT_SECRET_KEY=
```

A safe template is provided in:

```text
backend/.env.example
```

**Never upload real API keys, database credentials, or JWT secrets to GitHub.**

---

## What I Learned

Building CodeLens helped me gain practical experience with:

* Building a full-stack MERN-style application.
* Designing REST APIs using Express.
* Implementing JWT authentication.
* Password hashing and secure credential handling.
* MongoDB Atlas integration.
* Protected API routes.
* Backend middleware design.
* API rate limiting.
* Integrating AI APIs into a real application.
* Working with structured AI responses.
* Managing application state using Redux Toolkit.
* Integrating Monaco Editor with React.
* Responsive UI development using Tailwind CSS.
* Connecting frontend and backend services.
* Environment variable management.
* Git and GitHub workflow.

---

## Future Improvements

Planned improvements include:

* [ ] Review history for users.
* [ ] Code review history dashboard.
* [ ] Review comparison between submissions.
* [ ] More programming languages.
* [ ] Advanced code quality metrics.
* [ ] Export review reports.
* [ ] Improved AI prompt engineering.
* [ ] Deployment with production-grade infrastructure.
* [ ] Automated testing.
* [ ] CI/CD pipeline.
* [ ] More granular usage analytics.

---

## API Overview

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
```

### Code Review

```text
POST /api/review
```

The review endpoint requires authentication.

---

## Key Engineering Concepts

### Frontend

```text
React
├── Components
├── Pages
├── Services
├── Redux Slices
├── Protected Navigation
└── Responsive UI
```

### Backend

```text
Express
├── Routes
├── Controllers
├── Middleware
├── Services
├── Models
└── Database Configuration
```

This separation keeps the application modular and makes future features easier to maintain.

---

## Security Considerations

CodeLens follows several security practices:

* Passwords are hashed using bcrypt.
* JWT is used for authentication.
* Protected routes validate authentication.
* API credentials are stored in environment variables.
* `.env` is excluded from version control.
* Daily request limits help prevent API abuse.
* MongoDB credentials are never exposed in source code.

---

## Author

**Shubham Jain**

Computer Science & Engineering Student
Full-Stack Developer | React | Node.js | MongoDB | JavaScript

---

## Support

If you find this project interesting, consider giving it a ⭐ on GitHub.

---

## License

This project is intended for educational and portfolio purposes.
