<div align="center">

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/folder-app.svg" width="100" alt="Future Forge Logo">

# Future Forge

**Next-Generation Full-Stack Platform**

Build modern web applications with enterprise-grade security and AI capabilities

[🚀 Live Demo](https://future-forge-six.vercel.app) • [📖 Documentation](#documentation) • [🐛 Report Issue](https://github.com/Mehtab-24/future_forge/issues)

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

<br/>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🎯 Overview

**Future Forge** is a production-ready full-stack application that combines cutting-edge web technologies with enterprise security standards. Built for developers who demand performance, scalability, and maintainability. 

<div align="center">

### Why Future Forge? 

</div>

<table>
<tr>
<td width="33%" align="center">

### 🔐 Secure
Enterprise-grade security with JWT authentication, rate limiting, and security headers

</td>
<td width="33%" align="center">

### ⚡ Fast
Optimized performance with Next.js 15, React Server Components, and efficient caching

</td>
<td width="33%" align="center">

### 🎨 Modern
Beautiful UI with Tailwind CSS 4, responsive design, and smooth animations

</td>
</tr>
<tr>
<td width="33%" align="center">

### 🤖 AI-Powered
Integrated support for Google Gemini and OpenAI APIs

</td>
<td width="33%" align="center">

### 🐳 Containerized
Full Docker support for consistent development and deployment

</td>
<td width="33%" align="center">

### 📦 Scalable
Microservices architecture ready for horizontal scaling

</td>
</tr>
</table>

---

## ✨ Features

<table>
<tr>
<td>

**Authentication & Security**
- 🔑 JWT-based authentication
- 🛡️ Password hashing with bcrypt
- 🚦 Rate limiting protection
- 🔒 Security headers (Helmet)
- 🌐 CORS configuration

</td>
<td>

**Frontend Experience**
- ⚛️ React 19 with Next.js 15
- 🎨 Tailwind CSS 4 styling
- 📱 Fully responsive design
- 🌙 Modern UI components
- ⚡ Server-side rendering

</td>
</tr>
<tr>
<td>

**Backend Architecture**
- 🚀 RESTful API design
- 📊 MongoDB with Mongoose
- ✅ Request validation (Zod)
- 📝 Request logging (Morgan)
- 💚 Health check endpoints

</td>
<td>

**Developer Experience**
- 🐳 Docker containerization
- 🔄 Hot module replacement
- 📚 Comprehensive documentation
- 🧪 API testing suite
- 🛠️ TypeScript support

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Node. js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed: 

```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
docker --version # (optional)
```

### Installation

**Step 1: Clone the Repository**

```bash
git clone https://github.com/Mehtab-24/future_forge. git
cd future_forge
```

**Step 2: Environment Configuration**

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/future_forge

# Authentication
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGINS=http://localhost:3000
```

**Step 3: Choose Your Setup**

<details>
<summary><b>🐳 Docker Setup (Recommended)</b></summary>

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access Points:**
- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:5000
- 💚 Health:  http://localhost:5000/api/v1/health

</details>

<details>
<summary><b>💻 Local Development</b></summary>

**Backend:**
```bash
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Access Points:**
- 🌐 Frontend:  http://localhost:3000
- 🔌 API: http://localhost:5000

</details>

---

## 📚 Documentation

### Project Structure

```
future_forge/
├── 📂 src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Business logic
│   ├── middleware/       # Express middleware
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   └── utils/           # Helper functions
│
├── 📂 frontend/
│   ├── app/             # Next.js pages (App Router)
│   ├── components/      # React components
│   └── public/          # Static assets
│
├── 🐳 docker-compose.yml
├── 📄 Dockerfile
└── 📦 package.json
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm start` | Start production server |
| `npm run build` | Build for production |
| `npm run lint` | Run code linter |

---

## 🔌 API Reference

### Base URL

```
Local:   http://localhost:5000/api/v1
Production: https://your-domain.com/api/v1
```

### Endpoints

#### 🔐 Authentication

```http
POST   /auth/register    # Register new user
POST   /auth/login       # User login
GET    /auth/me          # Get current user (Protected)
```

#### 👥 Users

```http
GET    /users            # List all users (Protected)
GET    /users/:id        # Get specific user (Protected)
```

#### 💚 Health

```http
GET    /health           # API health status
```

### Example Usage

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"securepass123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepass123"}'

# Get Profile (with token)
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🌍 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|: --------:|
| `PORT` | Server port | `5000` | ✅ |
| `MONGODB_URI` | Database connection string | - | ✅ |
| `JWT_SECRET` | Secret for JWT signing | - | ✅ |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` | ❌ |
| `CORS_ORIGINS` | Allowed origins | - | ✅ |
| `NEXT_PUBLIC_API_URL` | API URL for frontend | - | ✅ |

> ⚠️ **Security Note:** Never commit sensitive credentials to version control.  Use environment variables or secrets management.

---

## 🚢 Deployment

### Deployment Options

<table>
<tr>
<td align="center" width="50%">

### Frontend Deployment

**Recommended Platforms:**
- [Vercel](https://vercel.com) ⭐
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

</td>
<td align="center" width="50%">

### Backend Deployment

**Recommended Platforms:**
- [Railway](https://railway.app) ⭐
- [Render](https://render.com)
- [AWS](https://aws.amazon.com)
- [Google Cloud](https://cloud.google.com)

**Requirements:**
- Node.js 18+
- MongoDB instance

</td>
</tr>
</table>

### Docker Deployment

```bash
# Build images
docker-compose build

# Deploy to production
docker-compose -f docker-compose.yml up -d

# View logs
docker-compose logs -f
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use secure, random `JWT_SECRET`
- [ ] Configure production database
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure automated backups
- [ ] Review security settings
- [ ] Set up CI/CD pipeline

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies: 

- [Next.js](https://nextjs.org/) - The React Framework
- [Express](https://expressjs.com/) - Fast, minimalist web framework
- [MongoDB](https://www.mongodb.com/) - Document database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

<div align="center">

### 🌟 Star this repo if you find it helpful!

**Made with ❤️ by [Mehtab-24](https://github.com/Mehtab-24)**

[⬆ Back to Top](#future-forge)

</div>
