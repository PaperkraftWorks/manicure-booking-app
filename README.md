# Manicure Booking App

A modern booking application for manicure services built with React and Tailwind CSS.

## Features

- Beautiful, responsive design
- Booking form with service selection
- Date and time slot selection
- WhatsApp integration for booking confirmation
- Form validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher) and npm (for local development)
- Docker and Docker Compose (for containerized deployment)
- Make (optional, for using Makefile commands)

### Using Makefile (Recommended)

The project includes a Makefile with convenient commands. View all available commands:

```bash
make help
```

**Quick Start:**
```bash
make start          # Build and run with Docker
make stop           # Stop Docker containers
make restart        # Restart Docker containers
```

**Development:**
```bash
make install        # Install npm dependencies
make dev            # Start development server
make build          # Build for production
```

**Docker:**
```bash
make docker-start   # Start Docker daemon (Colima)
make docker-build   # Build Docker image
make docker-up      # Start containers
make docker-down    # Stop containers
make docker-logs    # View container logs
make docker-rebuild # Rebuild and restart
make kill-port      # Kill process using port 3000
make check-port     # Check if port is available
make check-docker   # Check if Docker daemon is running
```

### Local Development

1. Install dependencies:
```bash
npm install
# or
make install
```

2. Start the development server:
```bash
npm run dev
# or
make dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Docker Deployment

#### Using Makefile (Easiest)

```bash
make start          # Build and start the application
# Application available at http://localhost:3000

make stop           # Stop the application
make restart        # Restart the application
make docker-logs    # View logs
```

**Using a different port:**
```bash
PORT=8080 make start  # Run on port 8080 instead
```

#### Using Docker Compose

1. Build and start the container:
```bash
docker-compose up -d
# or
make docker-up
```

2. The application will be available at `http://localhost:3000`

3. To stop the container:
```bash
docker-compose down
# or
make docker-down
```

4. To rebuild after code changes:
```bash
docker-compose up -d --build
# or
make docker-rebuild
```

#### Using Docker directly

1. Build the Docker image:
```bash
docker build -t manicure-booking-app .
```

2. Run the container:
```bash
docker run -d -p 3000:80 --name manicure-booking-app manicure-booking-app
```

3. The application will be available at `http://localhost:3000`

4. To stop the container:
```bash
docker stop manicure-booking-app
docker rm manicure-booking-app
```

## Troubleshooting

### Docker Daemon Not Running

If you get an error like "Cannot connect to the Docker daemon":

**Option 1: Use the Makefile command (automatic)**
```bash
make docker-start  # Starts Colima automatically
make start
```

**Option 2: Manually start Colima**
```bash
colima start
# Wait a few seconds, then try again
make start
```

**Option 3: Restart Colima if it's stuck**
```bash
colima stop
colima start
make start
```

**Note:** The Makefile now automatically checks and attempts to start Docker/Colima before running Docker commands.

### Port Already in Use

If you get an error that port 3000 is already allocated:

**Option 1: Kill the process using the port**
```bash
make kill-port
make start
```

**Option 2: Use a different port**
```bash
PORT=8080 make start
# Application will be available at http://localhost:8080
```

**Option 3: Manually find and kill the process**
```bash
# Find the process
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>
```

### Docker Container Issues

**View container logs:**
```bash
make docker-logs
```

**Restart containers:**
```bash
make restart
```

**Clean up and rebuild:**
```bash
make docker-clean
make docker-rebuild
```

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- HTML5
- JavaScript (ES6+)

