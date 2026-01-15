# Deployment Instructions

This project is structured into two parts:
- `frontend/`: Next.js application (Deploy to Vercel)
- `backend/`: Node.js/Express application (Deploy to Netlify Functions)

## 1. Backend Deployment (Netlify)

1.  Connect your repository to Netlify.
2.  **Base Directory**: `backend`
3.  **Build Command**: `npm install` (or leave empty if Netlify detects it automatically)
4.  **Publish Directory**: `backend` (or leave empty/default)
5.  **Environment Variables**:
    -   `MONGODB_URI`: Your MongoDB connection string.
    -   `JWT_SECRET`: A secret string for authentication.
    -   `NODE_ENV`: `production`

Netlify will automatically detect the `netlify.toml` file in the `backend` directory and configure the functions.

## 2. Frontend Deployment (Vercel)

1.  Connect your repository to Vercel.
2.  **Root Directory**: `frontend` (Click "Edit" next to "Root Directory" and select `frontend`).
3.  **Framework Preset**: Next.js (should be detected automatically).
4.  **Environment Variables**:
    -   `NEXT_PUBLIC_API_URL`: The URL of your deployed Netlify backend.
        -   Format: `https://your-site-name.netlify.app/api/v1` (Note: Append `/api/v1` because the backend routes are prefixed with it, and the Netlify redirect handles `/api/*`).

## Local Development

To run locally:

1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```
    Runs on `http://localhost:5000`.

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Runs on `http://localhost:3000`.
    
    The frontend is configured to proxy `/api` requests to `http://localhost:5000` locally.
