.PHONY: help install dev build preview docker-build docker-up docker-down docker-restart docker-logs docker-clean clean check-port kill-port check-docker docker-start docker-kill-all

# Default target
.DEFAULT_GOAL := help

# Variables
DOCKER_COMPOSE := docker-compose
DOCKER_IMAGE := manicure-booking-app
CONTAINER_NAME := manicure-booking-app
PORT ?= 3000
export PORT

##@ Development

help: ## Display this help message
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

install: ## Install npm dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build the application for production
	npm run build

preview: ## Preview production build locally
	npm run preview

##@ Docker

check-docker: ## Check if Docker daemon is running
	@if ! docker info >/dev/null 2>&1; then \
		echo "⚠️  Docker daemon is not running."; \
		echo "   Attempting to start Colima..."; \
		if command -v colima >/dev/null 2>&1; then \
			colima start || (echo "❌ Failed to start Colima. Please run 'colima start' manually." && exit 1); \
			echo "⏳ Waiting for Docker daemon to be ready..."; \
			sleep 3; \
		else \
			echo "❌ Docker daemon is not running and Colima is not installed."; \
			echo "   Please start Docker Desktop or install Colima."; \
			exit 1; \
		fi; \
	fi

docker-start: ## Start Docker daemon (Colima)
	@if command -v colima >/dev/null 2>&1; then \
		echo "Starting Colima..."; \
		colima start; \
		echo "⏳ Waiting for Docker daemon to be ready..."; \
		sleep 3; \
	else \
		echo "Colima is not installed. Please start Docker Desktop manually."; \
	fi

docker-build: check-docker ## Build Docker image
	$(DOCKER_COMPOSE) build

docker-up: check-docker check-port ## Start Docker containers
	$(DOCKER_COMPOSE) up -d

check-port: ## Check if port is available
	@if lsof -Pi :$(PORT) -sTCP:LISTEN -t >/dev/null 2>&1 ; then \
		echo "⚠️  Port $(PORT) is already in use."; \
		echo "   You can:"; \
		echo "   1. Stop the existing container: make kill-port"; \
		echo "   2. Use a different port: PORT=8080 make start"; \
		exit 1; \
	fi

kill-port: ## Kill process using the port
	@echo "Checking for processes on port $(PORT)..."
	@PID=$$(lsof -ti:$(PORT) 2>/dev/null) && \
		if [ -n "$$PID" ]; then \
			echo "Killing process $$PID on port $(PORT)"; \
			kill -9 $$PID || true; \
		else \
			echo "No process found on port $(PORT)"; \
		fi
	@echo "Checking for Docker containers using port $(PORT)..."
	@if docker info >/dev/null 2>&1; then \
		docker ps --filter "publish=$(PORT)" --format "{{.ID}}" | xargs -r docker stop 2>/dev/null || true; \
	else \
		echo "Docker daemon not running, skipping container check"; \
	fi

docker-down: check-docker ## Stop Docker containers
	$(DOCKER_COMPOSE) down

docker-restart: check-docker ## Restart Docker containers
	$(DOCKER_COMPOSE) restart

docker-logs: check-docker ## View Docker container logs
	$(DOCKER_COMPOSE) logs -f

docker-ps: check-docker ## Show running Docker containers
	$(DOCKER_COMPOSE) ps

docker-clean: check-docker ## Stop containers and remove volumes
	$(DOCKER_COMPOSE) down -v

docker-rebuild: check-docker check-port ## Rebuild and restart Docker containers
	$(DOCKER_COMPOSE) up -d --build

docker-shell: check-docker ## Access container shell
	docker exec -it $(CONTAINER_NAME) sh

docker-kill-all: ## Stop all running Docker containers
	@if docker info >/dev/null 2>&1; then \
		CONTAINERS=$$(docker ps -q); \
		if [ -n "$$CONTAINERS" ]; then \
			echo "Stopping all running Docker containers..."; \
			docker stop $$CONTAINERS; \
			echo "✅ All containers stopped"; \
		else \
			echo "No running containers found"; \
		fi; \
	else \
		echo "Docker daemon is not running"; \
	fi

##@ Maintenance

clean: ## Remove node_modules and dist directories
	rm -rf node_modules dist

clean-all: clean docker-clean ## Remove all generated files and Docker resources
	docker rmi $(DOCKER_IMAGE) 2>/dev/null || true

##@ Quick Start

start: docker-up ## Quick start: Build and run with Docker
	@echo "✅ Application is running at http://localhost:$(PORT)"
	@echo "   To use a different port: PORT=8080 make start"

stop: docker-down ## Quick stop: Stop Docker containers

restart: docker-restart ## Quick restart: Restart Docker containers

