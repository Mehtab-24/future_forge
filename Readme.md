# Future Forge

A full‑stack project combining a secure Node.js/Express API with a Next.js (React) frontend and MongoDB, containerized with Docker for easy local development and deployment.

- Backend: Express, MongoDB (Mongoose), JWT auth, CORS, Helmet, rate limiting, request logging
- Frontend: Next.js 15, React 19, Tailwind CSS 4, lucide-react
- AI integrations: Google Generative AI (Gemini) and OpenAI clients (optional)
- Dockerized: Multi-service setup with docker-compose (frontend, API, MongoDB)

## Table of Contents
- Features
- Tech Stack
- Quick Start
- Local Development (without Docker)
- Run with Docker Compose
- Environment Variables
- API Reference
- Project Structure
- Deployment
- Troubleshooting
- License

## Features
- User authentication with JWT (register, login, get current user)
- Secure defaults (Helmet, CORS, rate limiting)
- Health check endpoint for orchestration
- Production-ready Dockerfiles for both API and frontend
- Centralized configuration via environment variables

## Tech Stack
- Backend: Node.js, Express, Mongoose, JWT, zod, dotenv, morgan, express-rate-limit, helmet, cors
- Frontend: Next.js, React, Tailwind CSS, lucide-react
- Database: MongoDB
- DevOps: Docker, docker-compose
- Optional AI: @google/generative-ai, openai, @google/genai (frontend)

## Quick Start
Prerequisites:
- Node.js 18+ (Node 20 recommended)
- npm
- Docker and Docker Compose (optional, for containerized setup)
- MongoDB (only if running without Docker)

Clone:
```bash
git clone https://github.com/Mehtab-24/future_forge.git
cd future_forge
```

Create a .env file in the repo root:
```env
# Server
PORT=5000
MONGODB_URI=mongodb://localhost:27017/future_forge

# Auth
JWT_SECRET=change_me_to_a_strong_secret
JWT_EXPIRES_IN=7d

# CORS (comma-separated)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate limiting
RATE_LIMIT_WINDOW_MIN=15
RATE_LIMIT_MAX=100

# Optional AI keys (only if used)
GEMINI_API_KEY=
```

## Local Development (without Docker)

Backend (API):
```bash
# from repo root
npm install
npm run dev
# API runs at http://localhost:5000
# Health check: http://localhost:5000/api/v1/health
```

Frontend (Next.js):
```bash
cd frontend
npm install

# Ensure your frontend knows where the API is:
# export NEXT_PUBLIC_API_URL=http://localhost:5000
# or add it to a .env.local file in the frontend directory

npm run dev
# Frontend at http://localhost:3000
```

## Run with Docker Compose
The repository provides production-ready Dockerfiles and a compose file that runs:
- frontend (Next.js) on port 3000
- api (Express) on port 5000
- mongo (MongoDB) on port 27017

Start services:
```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- API: http://localhost:5000
- API Health: http://localhost:5000/api/v1/health

Stop services:
```bash
docker-compose down
```

Logs:
```bash
docker-compose logs -f
```

See also: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Environment Variables
The API reads configuration from environment variables (via .env):

- PORT (default 5000)
- MONGODB_URI (e.g., mongodb://localhost:27017/future_forge)
- JWT_SECRET (required; use a strong random string)
- JWT_EXPIRES_IN (default 7d)
- CORS_ORIGINS (comma-separated origins)
- RATE_LIMIT_WINDOW_MIN (default 15)
- RATE_LIMIT_MAX (default 100)
- GEMINI_API_KEY (optional)

Docker Compose sets sensible defaults and wires services together (see [docker-compose.yml](./docker-compose.yml)).

Frontend:
- NEXT_PUBLIC_API_URL (e.g., http://localhost:5000 or http://api:5000 in Docker)

Security note: Never commit real secrets to version control. Rotate JWT_SECRET for production and use a secrets manager.

## API Reference

Base URL (local):
- http://localhost:5000

Auth:
- POST /api/v1/auth/register — Register a user (name, email, password)
- POST /api/v1/auth/login — Login (email, password) → returns JWT
- GET /api/v1/auth/me — Get current user (requires Bearer token)

Users:
- GET /api/v1/users — List users (auth)
- GET /api/v1/users/:id — Get user by id (auth)

Health:
- GET /api/v1/health — Health check (no auth)

Example requests:

Register:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","password":"Str0ngP@ss!"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"Str0ngP@ss!"}'
```

Me:
```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

Tip: You can also use the provided [request.http](./request.http) file with VS Code REST Client/HTTPY for quick testing.

## Project Structure
High-level overview:
```
.
├─ Dockerfile                # Backend container
├─ docker-compose.yml        # Frontend + API + Mongo orchestration
├─ DEPLOYMENT_GUIDE.md       # Detailed Docker deployment guide
├─ deploy.sh                 # Helper script for Docker deployment
├─ package.json              # Backend package/commands
├─ README.md                 # You are here
├─ request.http              # API request samples for testing
├─ src/                      # Backend source (server, routes, models, controllers)
└─ frontend/
   ├─ Dockerfile             # Frontend container (builder/runner)
   ├─ package.json           # Frontend package/commands
   ├─ public/                # Static assets
   └─ app/                   # Next.js App Router code
```

Key scripts:
- Backend (root):
  - npm run dev — start API with nodemon
  - npm start — start API (production)
- Frontend (frontend/):
  - npm run dev — Next.js dev server
  - npm run build — build
  - npm start — production server
  - npm run lint — linting

## Deployment
- Docker: Use the provided Dockerfiles and [docker-compose.yml](./docker-compose.yml)
- Guide: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production tips (NODE_ENV=production, reverse proxy/SSL, secrets management, health checks)
- Frontend can be deployed to any Node-capable environment or platforms like Vercel (ensure NEXT_PUBLIC_API_URL points to your API)
- API can be deployed to any container platform or Node runtime with MongoDB connectivity

## Troubleshooting
- Ports in use: Change ports in docker-compose.yml or stop conflicting services
- API can’t reach Mongo: Ensure Mongo is healthy (compose waits with healthcheck) and MONGODB_URI is correct
- CORS issues: Verify CORS_ORIGINS includes your frontend origin(s)
- Health checks:
  - API: http://localhost:5000/api/v1/health
  - Frontend: http://localhost:3000

## License
MIT