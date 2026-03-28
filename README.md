# 🚀 PrimeTrade Backend Developer Intern Assignment

**Scalable REST API** with JWT Authentication, Role-Based Access, Task CRUD, and polished Vanilla JS Frontend. Built with Node.js/Express + MongoDB Atlas.

[![Backend](https://img.shields.io/badge/Backend-Port_5000-brightgreen)](http://localhost:5000/api-docs)
[![Frontend](https://img.shields.io/badge/Frontend-Live_Server_5500-blue)](http://127.0.0.1:5500/frontend/index.html)

## 🎯 Features Implemented

### ✅ Backend (Primary Focus)
- **User Registration/Login**: Password hashing (bcrypt), JWT authentication
- **Role-Based Access**: User vs Admin middleware
- **CRUD APIs**: `/api/v1/tasks` (Tasks entity) with owner filtering
- **API Versioning**: `/api/v1/` prefix
- **Error Handling**: Centralized middleware, proper HTTP status codes
- **Validation**: express-validator for all inputs
- **API Documentation**: Swagger UI at `/api-docs`
- **Database**: MongoDB Atlas (Mongoose ODM)

### ✅ Frontend (Supportive)
- **Vanilla JS** (React/Next.js friendly patterns)
- Register/Login forms with JWT-based auth
- Protected dashboard (JWT required)
- Full CRUD operations on Tasks
- Error/success messages from API responses
- **PrimeTrade-themed UI**: Dark fintech design, responsive

### ✅ Security & Scalability
- Secure JWT handling (Bearer tokens, expiration)
- Input sanitization & validation
- Modular structure (middleware, routes, models)

## 📋 Deliverables (All Complete)

1. **Backend project** → GitHub repo with full README ✅
2. **Working APIs** → Auth + Tasks CRUD ✅
3. **Frontend UI** → Polished dashboard that calls the APIs ✅
4. **API Documentation** → Swagger: `http://localhost:5000/api-docs` ✅
5. **Scalability Note** → See section below ✅

## 🚀 Quickstart

```bash
# Backend
cd backend
cp .env.example .env  # Add MONGO_URI (Atlas) + JWT_SECRET
npm install
npm run dev  # http://localhost:5000

# Frontend
# VS Code: Install Live Server → Right-click frontend/index.html → Open with Live Server
# Or: npx live-server frontend --port=5500
```

**Demo**: Backend on port **5000**, Frontend on **5500** (CORS enabled).

## 📖 API Documentation

**Swagger UI**: `http://localhost:5000/api-docs`

### Auth (Public)

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks (JWT Protected)

```text
POST   /api/v1/tasks        # Create (user-owned)
GET    /api/v1/tasks        # List (user: own tasks | admin: all)
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id    # Owner or admin only
```

**Example JWT Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "name": "...", "role": "admin" }
}
```

## 🗄️ Database Schema (MongoDB)

```javascript
// User
{
  name: String (required),
  email: String (unique, lowercase),
  password: String (hashed bcrypt),
  role: 'user' | 'admin'
}

// Task
{
  title: String (required),
  description: String,
  completed: Boolean,
  owner: ObjectId(User)
}
```

## 🔒 Security Practices

- **Password Hashing**: bcrypt with salt rounds
- **JWT**: Signed with 256-bit secret, 1h expiry (configurable via `JWT_EXPIRES_IN`)
- **Authorization**: `protect` + `authorize` middleware for role-based access
- **Validation**: express-validator on all critical inputs
- **No SQL injection**: MongoDB via Mongoose ODM

## ⚡ Scalability & Deployment Readiness

- **Stateless API**: JWT-based auth → easy horizontal scaling behind a load balancer.
- **Modular Routes**: `/api/v1` prefix → ready for `/api/v2` or microservices split.
- **Database**: MongoDB Atlas with built-in replication and scaling.

**Next-step enhancements (outlined but not required):**

- **Redis Caching** for frequently accessed task lists by user ID.
- **Rate Limiting** using `express-rate-limit` to protect against abuse.
- **Microservices** separation (Auth service, Task service) behind an API gateway.
- **Dockerization** with `Dockerfile` + `docker-compose.yml` for one-command deploy.
- **Structured Logging** via Winston + centralized log aggregation (ELK stack).
- **CI/CD** via GitHub Actions to deploy on push to main.

## 🎨 Frontend Theme

PrimeTrade-inspired design:

- Dark navy/indigo background gradient.
- Gold accent gradients for primary actions and titles.
- Glassmorphism-style cards with blurred backgrounds.
- Responsive layout for desktop and mobile.

The UI supports:

- User/Admin registration and login.
- Protected dashboard showing current authenticated user.
- Create, toggle-complete, delete, and refresh tasks.
- Inline success/error messages mapped from API responses.

## 🧪 Testing

Manual test cases executed:

- **Auth**
  - Register new user (user + admin roles) → JWT token issued.
  - Login existing user → JWT issued; invalid credentials rejected.

- **Tasks**
  - Create task (title, description, completed flag).
  - List tasks: users see own tasks; admin can be extended to see all.
  - Update task completion state (pending ↔ complete).
  - Delete task (owner/admin).

- **Validation & Errors**
  - Missing required fields → 400 with validation errors.
  - Missing/invalid JWT → 401 Unauthorized.
  - Forbidden access to others’ tasks → 403.
  - Non-existent ID → 404.

## 📊 Evaluation Criteria Coverage

| Criteria                         | Implementation                                                                 |
|----------------------------------|-------------------------------------------------------------------------------|
| **API Design**                   | RESTful routes, `/api/v1` versioning, proper status codes, modular routers   |
| **Database Schema Design**       | Mongoose models for User and Task with relations and timestamps              |
| **Security Practices**           | JWT, bcrypt password hashing, validation, role-based access control          |
| **Functional Frontend Integration** | Vanilla JS UI calling all auth + CRUD endpoints with live feedback         |
| **Scalability & Deployment**     | Stateless design, Atlas, clear notes on caching, microservices, Docker, CI/CD |

## 📧 Submit

- **GitHub**: [Backend-Assignment-project](https://github.com/Areeb-Xz/Backend-Assignment-project).
- **Live Demo** (local): Backend `http://localhost:5000`, Frontend `http://127.0.0.1:5500/frontend/index.html`.

---

*Built for the PrimeTrade.ai Backend Developer Intern assignment.*