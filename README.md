# Collabdraw

Real-time collaborative drawing & chat platform built as a Turborepo monorepo with a REST HTTP API (Express), a WebSocket real‑time server, a Next.js frontend, and a shared Prisma database layer.

---

## 1. Monorepo Structure

```
apps/
	collabdraw-frontend     # Next.js (App Router) client
	http-backend            # Express REST API (rooms, auth, history)
	ws-backend              # WebSocket server (live shapes & chat)
packages/
	backend-utils           # Shared backend config + logger
	common                  # Shared Zod schemas
	db                      # Prisma schema & client
	eslint-config           # Centralized ESLint configs
	typescript-config       # Shared tsconfig bases
docker/                   # Service Dockerfiles
kubernetes/               # K8s manifests (frontend/http/ws)
```

Key entrypoints:
- HTTP server: `apps/http-backend/src/index.ts`
- WS server: `apps/ws-backend/src/index.ts`
- Frontend root layout: `apps/collabdraw-frontend/src/app/layout.tsx`
- Canvas client: `apps/collabdraw-frontend/src/components/CanvasClient.tsx`
- Socket hook: `apps/collabdraw-frontend/src/hooks/useSocket.ts`

---

## 2. Architecture Overview

1. User authenticates via HTTP (JWT stored as cookie).
2. Frontend fetches historical room data (rooms, shapes, chats) via REST.
3. Frontend opens a WebSocket connection (JWT passed as query param) for live drawing & chat.
4. WS server broadcasts shape / chat events to room members and persists them through Prisma.
5. HTTP API serves persisted data for late joiners or refresh scenarios.

---

## 3. Tech Stack

### Core
- Monorepo Orchestration: Turborepo (`turbo.json`, pipeline caching & filtering)
- Package Manager: pnpm (workspaces)
- Language: TypeScript (shared tsconfig presets), Node.js (>=18 runtime; Node 22 in containers)
- Runtime Environments: Node.js Express server, Node.js `ws` WebSocket server, Next.js 15 (App Router) frontend

### Frontend (apps/collabdraw-frontend)
- Framework: Next.js 15 + React 19
- Styling: Tailwind CSS v4, custom global styles
- UI Primitives: Radix UI (`@radix-ui/react-*`)
- Icons: `lucide-react`
- Theming: `next-themes`
- Animation/Motion: `motion`
- Notifications / Toasts: `sonner`
- Utility Libraries: `clsx`, `class-variance-authority`, `tailwind-merge`
- State/Context: React Context (AuthProvider), local component state
- Networking: Axios
- WebSocket Client: Native `WebSocket` wrapped in custom hook `useSocket`

### HTTP Backend (apps/http-backend)
- Framework: Express 5
- Auth: JWT (`jsonwebtoken`) + cookies (`cookie-parser`)
- Security / Middleware: `cors`
- Password Hashing: `bcryptjs`
- Validation: Zod schemas from `@repo/common`
- Persistence: Prisma Client (`@repo/db`)
- Logging: Custom lightweight logger (writes to `logs.txt`)

### WebSocket Backend (apps/ws-backend)
- Library: `ws`
- Auth: JWT verification (shared secret)
- Persistence: Prisma Client for chat & shape events
- In-memory session tracking for active connections & joined rooms

### Shared Packages
- `@repo/common`: Zod schemas (room creation, etc.)
- `@repo/db`: Prisma schema (`schema.prisma`), generated client
- `@repo/backend-utils`: Central config (ports, secrets), logger abstraction
- `@repo/eslint-config`: Unified linting (ESLint 9, Prettier integration, React / Next / Turbo plugins)
- `@repo/typescript-config`: Base TS configs (for consistent compiler options)

### Database & Persistence
- ORM: Prisma 6.x
- Database: (Intended) PostgreSQL (configured via `DATABASE_URL`), supports migrations & schema versioning

### Dev Tooling & Quality
- Type Checking: TypeScript 5.8
- Linting: ESLint 9 + custom configs
- Formatting: Prettier 3
- Build Orchestration & Caching: Turborepo (local + optional remote caching)
- Logging: Custom file logger; (future: pino/winston + structured logs)

### Infrastructure / DevOps
- Containerization: Docker (multi-service Dockerfiles per component)
- Images: Node 22 Alpine base for minimal footprint
- Orchestration: Kubernetes (Deployments, Services, Ingress)
- Ingress: NGINX Ingress w/ TLS termination (`collabdraw-ingress`)
- Secrets & Config: K8s Secrets (`app-secrets`) + ConfigMap (`backend-config`)
- Scaling: Replica sets (e.g., frontend & http-backend replicas set to 2) for HA
- Continuous Delivery (assumed): Container registry images (`suhaskanwar/*` tags)
- Environment Promotion: Migration container (`Dockerfile.migrate`) for schema deployment

### Security & Auth
- JWT-based user identity (shared secret)
- Cookie-based session for REST; query-param token for WS (improvable)
- TLS via Kubernetes Ingress certificate (`collabdraw-tls`)

---

## 4. HTTP Backend (REST API)

Entrypoint: `apps/http-backend/src/index.ts`

Responsibilities:
- User auth (JWT issuance via a dedicated auth controller — token stored as cookie)
- Room lifecycle: create, join, list, fetch single
- Historical data: chats & shapes for a room

Controllers (room): `apps/http-backend/src/controllers/roomController.ts`
Middleware: `apps/http-backend/src/middlewares/authentication.ts` attaches `req.userId` after verifying JWT.

Flow:
1. Client sends REST request with cookie token.
2. Middleware validates token and enriches request.
3. Controller executes Prisma operations and returns normalized JSON.

---

## 5. WebSocket Backend

Entrypoint: `apps/ws-backend/src/index.ts`

Connection Lifecycle:
1. Client connects: `ws://HOST:8080?token=<jwt>`
2. Server validates token; associates socket with user + joined rooms list.
3. Client emits messages (JSON) of types: `join_room`, `leave_room`, `shape`, `chat`.
4. Server persists `shape` & `chat` payloads, rebroadcasts to all sockets in the same room except origin.
5. On disconnect, socket is removed from tracking map.

Persistence: Prisma models for `Shape` and `Chat` allow historical replay through HTTP.

---

## 6. Frontend (Next.js)

Primary Responsibilities:
- Authentication UI & state (AuthProvider)
- Room discovery & join/create flows
- Real-time collaborative canvas (tools, drawing, erasing, shape serialization)
- Chat panel overlay synchronized with WS + REST history

Real-Time Strategy:
1. On room mount: fetch historical shapes/chats via REST.
2. Open WS connection; send `join_room`.
3. Merge live incoming events (idempotent merge strategy recommended — currently append).

Key Modules:
- Canvas: `CanvasClient.tsx` / `CanvasRoom.tsx`
- Chat: `ChatBox.tsx`
- Room lists: `Rooms.tsx`, `RoomCard.tsx`
- Auth: `AuthComponent.tsx`
- Dialogs: `CreateRoomDialog.tsx`, `JoinRoomDialog.tsx`

---

## 7. Shared Packages

- `@repo/common` — Zod schemas for validation across layers.
- `@repo/db` — Prisma schema & generated client; consumed by both backends.
- `@repo/backend-utils` — Config & logger (ports, secrets, basic file logging).
- `@repo/eslint-config` / `@repo/typescript-config` — Consistency enforcers.

---

## 8. Local Development

Install dependencies:
```bash
pnpm install
```

Generate Prisma client:
```bash
pnpm db:generate
```

Run everything (parallel via Turbo):
```bash
pnpm dev
```

Or individually:
```bash
pnpm --filter collabdraw-http-backend dev
pnpm --filter collabdraw-ws-backend dev
pnpm --filter collabdraw-frontend dev
```

Visit:
- Frontend: http://localhost:3000
- REST API: http://localhost:9090
- WS: ws://localhost:8080

---

## 9. Docker

Service Dockerfiles:
- Frontend: `docker/Dockerfile.frontend`
- HTTP API: `docker/Dockerfile.http`
- WS Server: `docker/Dockerfile.ws`
- Migration / Prisma deploy: `docker/Dockerfile.migrate`

Example builds:
```bash
docker build -f docker/Dockerfile.http -t collabdraw-http .
docker build -f docker/Dockerfile.ws -t collabdraw-ws .
docker build -f docker/Dockerfile.frontend -t collabdraw-frontend .
```

Run (ensure env file with DATABASE_URL & JWT_SECRET for backends):
```bash
docker run --env-file .env -p 9090:9090 collabdraw-http
docker run --env-file .env -p 8080:8080 collabdraw-ws
docker run -p 3000:3000 collabdraw-frontend
```

---

## 10. Kubernetes

Manifests:
- Frontend: `kubernetes/frontend-manifest.yml`
- HTTP Backend: `kubernetes/http-manifest.yml`
- WS Backend: `kubernetes/ws-manifest.yml`

Ingress (NGINX) routes:
- `/` → frontend-service (port 80)
- `/api` → http-backend-service (port 9090)
- `/ws` → ws-backend-service (port 8080)

Apply:
```bash
kubectl apply -f kubernetes/http-manifest.yml
kubectl apply -f kubernetes/ws-manifest.yml
kubectl apply -f kubernetes/frontend-manifest.yml
```

---

## 11. Data Flow (Drawing & Chat)

1. User joins room via REST (membership recorded).
2. Client preloads historical shapes & chats.
3. WebSocket connection established; emits `join_room`.
4. User actions send `shape` or `chat` events.
5. WS backend persists + broadcasts events to room peers.
6. Clients merge events into local canvas / chat state.

---

## 12. Authentication & Security

- JWT tokens (must rotate `JWT_SECRET` in production).
- HTTP-only secure cookies recommended (ensure production flags).
- WS token currently via query string (improve: move to subprotocol or short-lived signed nonce exchange).
- TLS termination handled at Ingress (certificate: `collabdraw-tls`).

Hardening Opportunities:
- Add rate limiting (e.g., `express-rate-limit`).
- Enforce payload size limits.
- Structured logging with request IDs.
- Audit & revoke tokens (exp/iat claims, refresh flow).

---

## 13. Logging & Observability

Current:
- Simple file logger writing to `apps/http-backend/logs.txt` (via shared util)

Roadmap:
- Structured JSON logs (pino/winston)
- Metrics (Prometheus + Grafana) — connection counts, event throughput
- Tracing (OpenTelemetry) for request/WS event latency

---

## 14. Summary

Collabdraw integrates REST, real-time WebSockets, and a modern React/Next.js UI over a shared Prisma data model, packaged in a scalable container & Kubernetes-native architecture with clear paths for future enhancements in performance, security, and observability.