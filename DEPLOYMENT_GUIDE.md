# Future Forge - Docker Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git (for cloning the repository)

### Deployment Steps

1. **Clone the repository** (if not already done):
   ```bash
   git clone <your-repo-url>
   cd Future.Forge/Backend_FF
   ```

2. **Run the deployment script**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Or deploy manually**:
   ```bash
   # Build and start all services
   docker-compose up --build -d
   
   # View logs
   docker-compose logs -f
   
   # Stop services
   docker-compose down
   ```

## 📋 Services Overview

| Service | Port | Description |
|---------|------|-------------|
| Frontend (Next.js) | 3000 | React frontend application |
| Backend API (Node.js) | 5000 | Express API server |
| MongoDB | 27017 | Database |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with:

```env
# JWT Configuration
JWT_SECRET=your-strong-secret-key-here
JWT_EXPIRES_IN=7d

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MIN=15
RATE_LIMIT_MAX=100

# AI API Keys (optional)
GEMINI_API_KEY=your-gemini-api-key
```

### Production Deployment

For production deployment, update the `docker-compose.yml`:

1. Change `NODE_ENV: development` to `NODE_ENV: production` for the API service
2. Add proper SSL/TLS configuration
3. Use environment-specific secrets management
4. Consider using a reverse proxy (nginx) for SSL termination

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   MongoDB       │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (Database)    │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔍 Monitoring & Debugging

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f frontend
```

### Check Service Status
```bash
docker-compose ps
```

### Access Containers
```bash
# Backend API
docker exec -it future-forge-api bash

# Frontend
docker exec -it future-forge-frontend sh

# MongoDB
docker exec -it future-forge-mongo mongosh
```

## 🔄 Updates & Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

### Backup Database
```bash
docker exec future-forge-mongo mongodump --out /backup
docker cp future-forge-mongo:/backup ./mongo-backup
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**: Stop existing services or change ports in `docker-compose.yml`
2. **Build failures**: Check Docker daemon is running and has enough resources
3. **Database connection issues**: Ensure MongoDB is healthy before API starts

### Health Checks
- API Health: `http://localhost:5000/api/v1/health`
- Frontend: `http://localhost:3000`

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)