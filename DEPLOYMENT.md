# Deployment Guide

## 1. Backend Deployment (Netlify)

The backend is configured to run as Serverless Functions on Netlify.

### Prerequisites
- A Netlify account.
- A MongoDB Atlas cluster (Cloud Database).

### Steps
1. **Push to GitHub**: Ensure your code is on GitHub.
2. **Import to Netlify**:
   - Go to Netlify Dashboard -> "Add new site" -> "Import an existing project".
   - Select your GitHub repository.
3. **Configuration**:
   - **Base directory**: `backend`
   - **Build command**: `echo "Backend build"` (or leave empty if not needed)
   - **Publish directory**: `src` (or default)
   - **Functions directory**: `functions`
4. **Environment Variables**:
   - Go to Site Settings -> Environment Variables.
   - Add `MONGODB_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://<user>:<pass>@cluster.mongodb.net/future_forge`).
   - Add `JWT_SECRET`: A secure random string.
   - Add `GEMINI_API_KEY`: If using Gemini.
   - Add `OPENAI_API_KEY`: If using OpenAI.

## 2. Frontend Deployment (Vercel)

The frontend is a Next.js application optimized for Vercel.

### Prerequisites
- A Vercel account.

### Steps
1. **Import to Vercel**:
   - Go to Vercel Dashboard -> "Add New..." -> "Project".
   - Select your GitHub repository.
2. **Configuration**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
3. **Environment Variables**:
   - Add `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://your-backend-site.netlify.app/api/v1`).
     - **Important**: Ensure you include `/api/v1` at the end.
4. **Deploy**: Click Deploy.

## 3. Local Development

1. **Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   Runs on `http://localhost:5000`.

2. **Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Runs on `http://localhost:3000`.

## Troubleshooting

- **Database Connection Failed**:
  - Locally: Ensure MongoDB is running or accept "Offline Mode".
  - Production: Ensure `MONGODB_URI` is set correctly in Netlify.
  - Check Network Access in MongoDB Atlas (allow access from anywhere `0.0.0.0/0` for Netlify/Vercel).

- **CORS Errors**:
  - In `backend/.env` (or Netlify vars), set `CORS_ORIGINS` to your Vercel frontend URL (e.g., `https://future-forge-frontend.vercel.app`).
