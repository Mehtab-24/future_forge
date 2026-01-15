# Future Forge Deployment Instructions

This guide provides step-by-step instructions for deploying both the Frontend (Next.js) and Backend (Express) of the Future Forge application.

## 🚀 1. Backend Deployment

You can deploy the backend to **Vercel** (recommended for unity) or **Netlify**.

### Option A: Deploy to Vercel (Recommended)

1.  **Push your code** to GitHub.
2.  Log in to [Vercel Dashboard](https://vercel.com/dashboard).
3.  Click **"Add New..."** -> **"Project"**.
4.  Import your `future_forge` repository.
5.  **Configure Project**:
    *   **Framework Preset**: Select **Other** (since the root is not a framework, but we are deploying the `backend` folder).
    *   **Root Directory**: Click "Edit" and select `backend`.
    *   **Environment Variables**: Add the following:
        *   `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
        *   `JWT_SECRET`: A long, random string for security.
        *   `OPENROUTER_API_KEY`: Your OpenRouter API key.
        *   `CORS_ORIGINS`: Your frontend URL (e.g., `https://future-forge-frontend.vercel.app`). You can add `*` temporarily for testing.
        *   `NODE_ENV`: `production`
6.  Click **"Deploy"**.
7.  **Copy the assigned Domain**. 
    *   **Success!** You have already deployed this to: `https://futureforge01.netlify.app`

### Option B: Deploy to Netlify (ALREADY COMPLETED)

You have successfully deployed the backend to: `https://futureforge01.netlify.app/`
Ensure the following Environment Variables are set in your Netlify Site Configuration:
*   `MONGODB_URI`
*   `JWT_SECRET`
*   `OPENROUTER_API_KEY`
*   `CORS_ORIGINS` (Set to your Vercel Frontend URL or `*`)

---

## 🎨 2. Frontend Deployment (Vercel)

1.  Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `future_forge` repository.
4.  **Configure Project**:
    *   **Framework Preset**: **Next.js** (should be auto-detected).
    *   **Root Directory**: **IMPORTANT:** Click "Edit" and select `frontend`.
    *   **Environment Variables**:
        *   `BACKEND_URL`: `https://futureforge01.netlify.app` (No trailing slash).
        *   *Note: This connects your frontend to your active Netlify backend.*
5.  Click **"Deploy"**.

## ✅ Verification

1.  Open your deployed Frontend URL.
2.  Try to **Log In** or **Register**.
    *   If successful, the Frontend is correctly talking to the Backend, and the Backend is correctly talking to MongoDB.
3.  Try running a **Simulation**.
    *   If successful, the Backend is correctly talking to OpenRouter AI.

## 🛠 Troubleshooting

*   **CORS Errors**: Check your Backend's `CORS_ORIGINS` variable. It must exactly match your Frontend's URL (e.g., `https://future-forge-frontend.vercel.app`).
*   **Database Connection**: Check the `MONGODB_URI` in your Backend environment variables. Ensure IP Access List in MongoDB Atlas allows access from everywhere (`0.0.0.0/0`) since serverless IP addresses change.
*   **AI Errors**: Check `OPENROUTER_API_KEY`.
