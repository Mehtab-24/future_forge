@echo off
REM Future Forge Docker Deployment Script for Windows

echo 🚀 Starting Future Forge Docker Deployment...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not available. Please install Docker Desktop.
    pause
    exit /b 1
)

REM Stop any existing containers
echo 🛑 Stopping existing containers...
docker-compose down

REM Build and start the services
echo 🏗️ Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check if services are running
echo 🔍 Checking service status...
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo ✅ Services are running successfully!
    echo.
    echo 🌐 Application URLs:
    echo    Frontend: http://localhost:3000
    echo    Backend API: http://localhost:5000
    echo    MongoDB: localhost:27017
    echo.
    echo 📊 To view logs: docker-compose logs -f
    echo 🛑 To stop: docker-compose down
    echo.
    echo 📝 Press any key to open the application in your browser...
    pause >nul
    start http://localhost:3000
) else (
    echo ❌ Services failed to start properly.
    echo 📋 Checking logs...
    docker-compose logs --tail=50
    pause
)