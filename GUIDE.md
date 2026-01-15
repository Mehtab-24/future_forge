# Future Forge - Project Guide & Deployment Manual

This guide covers everything you need to run, verify, and deploy the Future Forge project.

## 🚀 Quick Start (Local Development)

### 1. Backend Setup
The backend runs on Node.js/Express.

```bash
cd backend
npm install
npm run dev
```
*   **Port**: 5000
*   **Health Check**: http://localhost:5000/api/health
*   **Env**: Ensure `.env` exists (created automatically).

### 2. Frontend Setup
The frontend is a Next.js application.

```bash
cd frontend
npm install
npm run dev
```
*   **Port**: 3000
*   **URL**: http://localhost:3000

---

## ✅ Verification

We have included a robust verification script to ensure all API routes are functioning correctly and returning the expected data structure (preventing crashes).

**Run the verification script:**

```bash
cd backend
node verify-project.js
```

**Expected Output:**
```
Testing Simulate (Mock)...
Simulate (Mock) PASSED: All required fields present.
Testing Simulate Variant (Mock)...
Simulate Variant (Mock) PASSED: All required fields present.
ALL VERIFICATION TESTS PASSED
```

---

## 🌍 Deployment Guide

### Backend (Netlify Functions)
The backend is configured to deploy as serverless functions on Netlify.

1.  **Push to GitHub**: Ensure your latest code is on GitHub.
2.  **Netlify Dashboard**:
    *   "Add new site" -> "Import an existing project".
    *   Select your GitHub repo.
    *   **Base directory**: `backend`
    *   **Build command**: `echo "No build"` (or leave blank if allowed)
    *   **Publish directory**: `backend` (Netlify looks for `netlify.toml` automatically)
    *   **Environment Variables**: Add `OPENAI_API_KEY` and `MONGODB_URI`.

### Frontend (Vercel)
The frontend is optimized for Vercel.

1.  **Vercel Dashboard**:
    *   "Add New..." -> "Project".
    *   Select your GitHub repo.
    *   **Root Directory**: `frontend` (Edit this setting!).
    *   **Framework Preset**: Next.js (Automatic).
    *   **Environment Variables**:
        *   `NEXT_PUBLIC_API_URL`: Your Netlify Backend URL (e.g., `https://your-site.netlify.app/api`).

---

## 🛠 Troubleshooting

**1. "Database connection failed"**
*   This is normal if you don't have a local MongoDB running. The server will start anyway in "Graceful Fallback" mode.
*   **Fix**: For local dev, you can ignore it or install MongoDB. For production, set `MONGODB_URI` in Netlify.

**2. "Port 5000 in use"**
*   If the backend fails to start, another process might be using port 5000.
*   **Fix**: Kill the process or restart your computer.

**3. Frontend Crashes (Butterfly/Simulate)**
*   We have added defensive coding to `SimulationView.tsx` and updated the backend schema to ensure all required fields (`phase`, `change`, `skills_developed`) are always present.

---

## 📂 Project Structure

*   **frontend/**: Next.js UI.
    *   `components/SimulationView.tsx`: Main simulation visualization.
    *   `components/TimelineCard.tsx`: Timeline entry display.
*   **backend/**: Express Server.
    *   `src/schemas/simulation.js`: Zod schemas for data validation.
    *   `src/routes/simulate*.js`: API routes and mock data.
    *   `verify-project.js`: System health check script.
