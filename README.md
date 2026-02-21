
<img width="2543" height="1387" alt="Screenshot 2026-02-17 100829" src="https://github.com/user-attachments/assets/0d00773c-1fe1-43e8-9085-53e44124e765" />


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

To deploy to a cloud provider:

1. Build and push images to a registry:

```bash
docker compose build
docker tag devops-arch-backend <registry>/devops-arch-backend:latest
docker tag devops-arch-frontend <registry>/devops-arch-frontend:latest
docker push <registry>/devops-arch-backend:latest
docker push <registry>/devops-arch-frontend:latest
```

2. Provision a small Kubernetes or ECS cluster using the generated Terraform as a starting point.
3. Point your domain at the frontend service / load balancer; ensure backend and databases are reachable and secured.

### CloudWatch & observability (ready hooks)

- Backend is structured to easily add:
  - Request logging middleware that ships logs to CloudWatch Logs
  - Metrics export (e.g., via CloudWatch Embedded Metrics Format)
- Add a CloudWatch agent sidecar or Fluent Bit to ship container logs in production.

### Notes

- The AI engine is implemented as a composable `AiEngine` class which can be wired to a real LLM provider using `AI_PROVIDER`, `AI_API_KEY` and `AI_MODEL`.
- SaaS subscription logic is modeled via the `plan` field (`free` / `pro`) on users and enforced at the API layer; extend this to integrate Stripe or other billing providers.

