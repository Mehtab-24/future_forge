# Future Forge Backend

A Node.js + Express + MongoDB API with JWT auth, CORS, rate limiting, and Docker.

## Quickstart

1. Copy `.env.example` to `.env` and set values:
```bash
cp .env.example .env
```

2. Install deps:
```bash
npm install
```

3. Run dev:
```bash
npm run dev
```

API will be available at `http://localhost:5000`.

## Environment

- `PORT` (default 5000)
- `MONGODB_URI` (e.g. `mongodb://localhost:27017/future_forge`)
- `JWT_SECRET` (required)
- `JWT_EXPIRES_IN` (default `7d`)
- `CORS_ORIGINS` (comma-separated, e.g. `http://localhost:5173`)
- `RATE_LIMIT_WINDOW_MIN` (default `15`)
- `RATE_LIMIT_MAX` (default `100`)

## Endpoints

- `POST /api/v1/auth/register` — name, email, password
- `POST /api/v1/auth/login` — email, password
- `GET /api/v1/auth/me` — requires Bearer token
- `GET /api/v1/users` — list users (auth)
- `GET /api/v1/users/:id` — get user by id (auth)

## Docker

```bash
docker compose up --build
```

API: `http://localhost:5000` | Mongo: `mongodb://localhost:27017`

## Notes

- Uses Mongoose with a simple `User` model you can extend.
- Add additional routes/controllers for your domain (projects, posts, etc).
- For production, rotate `JWT_SECRET`, set `NODE_ENV=production`, and consider adding logging/metrics.