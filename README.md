<img width="2543" height="1387" alt="Architecture png" src="https://github.com/user-attachments/assets/f750c178-9ede-4a20-824c-c76db09697f9" />

## DevOps Architect AI – SaaS Platform

AI-powered DevOps architecture generator that produces AWS reference architectures, Terraform, CI/CD pipelines, and cost estimates with an enterprise-grade dashboard UI.

### Tech stack

- **Frontend**: React (Vite, TypeScript), Tailwind CSS, Framer Motion, React Flow, Recharts, React Syntax Highlighter
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Redis, JWT auth, role-based access (Admin/User)
- **AI module**: Rule-based engine with LLM-ready prompt structure (pluggable with providers like OpenAI)
- **Infra**: Docker, Docker Compose, Nginx (production reverse proxy), PostgreSQL, Redis

### Project structure

- `frontend/` – Vite React app with:
  - Premium SaaS dashboard layout (`RootLayout`)
  - Pages: `DashboardPage`, `ArchitectureBuilderPage`, `AnalyticsPage`, `ExportPage`
  - React Flow-based architecture diagram with AWS-style nodes and tooltips
  - Charts for cost and service distribution
- `backend/` – Express TypeScript service with:
  - `src/config` – env, Postgres pool, Redis client
  - `src/ai` – `AiEngine` for architecture JSON, Terraform, CI/CD, and cost estimation
  - `src/controllers` – `auth`, `architecture`, `admin`
  - `src/middleware` – JWT auth, RBAC, error handler
  - `src/models` – `user`, `architecture` (history)
  - REST APIs under `/api`

### Environment configuration

Copy `.env.example` to `.env` at the repo root and adjust:

- **Backend**
  - `PORT=4000`
  - `JWT_SECRET` / `JWT_EXPIRES_IN`
  - `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
  - `REDIS_HOST`, `REDIS_PORT`
  - `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL` (for plugging in a real LLM)
- **Frontend**
  - `VITE_API_BASE_URL` – defaults to `http://localhost:4000/api` in local dev, `http://backend:4000/api` inside Docker

### Backend APIs

Base path: `http://localhost:4000/api`

- **Auth**
  - `POST /auth/register` – `{ email, password }` → `{ token, user }`
  - `POST /auth/login` – `{ email, password }` → `{ token, user }`
- **Core AI / architecture**
  - `POST /generate-architecture`
    - Body: `{ name, appType, trafficScale, highAvailability, region }`
    - Returns: architecture JSON, Terraform, CI/CD YAML, cost breakdown, scalability score, saved history record
    - **Free vs Pro**: Free plan cannot request `highAvailability=true` or `trafficScale="high"` (returns 402).
  - `POST /generate-terraform` – same input as above, returns `terraform`
  - `POST /generate-cicd` – same input as above, returns `cicdYaml`
  - `POST /estimate-cost` – same input as above, returns `{ cost, scalabilityScore }` (cached in Redis)
  - `GET /user/history` – returns latest 50 saved architectures for the authenticated user
- **Admin**
  - `GET /admin/usage` – Admin-only usage metrics (total users, total architectures)

JWT is passed via `Authorization: Bearer <token>`.

### Running locally (without Docker)

1. **Install dependencies**

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. **Start infrastructure**

- Run a local PostgreSQL (matching the `.env` values)
- Run Redis (`redis-server` or container)

3. **Start backend**

```bash
cd backend
npm run dev
```

4. **Start frontend**

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` and ensure `VITE_API_BASE_URL` points to `http://localhost:4000/api`.

### Running with Docker Compose

1. Copy `.env.example` to `.env` and adjust secrets.
2. Build and start all services:

```bash
docker compose up --build
```

Services:

- Frontend (Nginx + built Vite app) – `http://localhost:3000`
- Backend (Express API) – `http://localhost:4000`
- PostgreSQL – `localhost:5432`
- Redis – `localhost:6379`

### Nginx & deployment

- `frontend/Dockerfile` – multi-stage build:
  - Stage 1: build React app with Vite
  - Stage 2: serve static assets via Nginx with `frontend/nginx.conf`
- `frontend/nginx.conf`:
  - Serves SPA from `/usr/share/nginx/html`
  - Proxies `/api/` to the backend service (`backend:4000`)
  - Enables gzip & sensible defaults for production

## ☁️ Deployment on AWS (Docker Compose)

This project is deployed on AWS using Docker Compose in a production-like environment.

### Deployment setup

- **Cloud**: AWS EC2 (Ubuntu)
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Ports**:
  - Frontend → 3000
  - Backend → 4000

### Steps

1. Launch EC2 & allow ports `3000`, `4000`, `22` , `80`

2. Install Docker

```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo apt-get install docker-compose-v2 
```

3. Clone repo

```bash
git clone <https://github.com/Sumantswain/AI-Powered-Devops-Architecture-Generator.git>
cd AI-Powered-Devops-Architecture-Generator/
```

4. Setup env

```bash
cp .env.example .env
```

5. Run app

```bash
docker compose up -d --build 
```

### Access

- Frontend → `http://<EC2-IP>:3000`
- Backend → `http://<EC2-IP>:4000/api`

---

## 🏗️ Architecture

3-tier architecture:

- **Frontend** → React + Nginx  
- **Backend** → Node.js API  
- **Database** → PostgreSQL + Redis  

---

## 📊 Observability (ready)

- CloudWatch logs integration ready  
- Metrics export supported  
- Can integrate Fluent Bit / logging agents  

---

## 🧠 Notes

- AI engine is modular and LLM-ready  
- Supports SaaS plan system (Free vs Pro)  
- Easily extendable with Stripe billing  
- Can be scaled to ECS / Kubernetes  

---

## ⭐ Highlights

- AI-powered DevOps automation platform  
- Generates AWS architecture + Terraform + CI/CD  
- Fully containerized deployment  
- Production-ready SaaS dashboard  
- Deployed on AWS using Docker Compose  

