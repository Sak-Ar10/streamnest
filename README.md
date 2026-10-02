# StreamNest 🎬

StreamNest is a modern, responsive, production-quality streaming web application built with a React 18 frontend and a Node.js + Express + PostgreSQL backend.

## 🚀 Deployment Links
- **Frontend (Vercel):** *Pending deployment in Phase 9*
- **Backend API (Render):** *Pending deployment in Phase 9*
- **Health Check:** `http://localhost:4000/api/health` *(Local)*

## 🔑 Demo Test Account
- **Email:** `demo@streamnest.io`
- **Password:** `StreamNest123!`

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Lucide Icons.
- **Backend:** Node.js (LTS), Express, `pg` (node-postgres), `bcryptjs`, `jsonwebtoken`, `zod`, `helmet`, `cors`, `cookie-parser`, `express-rate-limit`.
- **Database:** PostgreSQL (Neon / Supabase / Render).
- **Authentication:** Email & Password with bcrypt (cost factor 12), JWT (7-day duration) stored in an `httpOnly, Secure, SameSite=Lax` cookie.
- **Proxy Architecture:** First-party API requests via Vite dev-server proxy in development (`/api -> :4000`) and Vercel URL rewrites in production (`/api/(.*) -> Render backend`), preventing cross-site cookie and CORS issues.

---

## 📋 Environment Variables

### Backend (`server/.env`)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `4000` |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/streamnest` |
| `JWT_SECRET` | Secret key for signing auth tokens | *(secure 32+ char random string)* |
| `CLIENT_ORIGIN` | Allowed origin for CORS in production | `http://localhost:5173` |
| `TMDB_API_KEY` | *(Optional)* The Movie Database API key | *(leave blank to use bundled seed)* |
| `GROQ_API_KEY` | *(Optional)* Groq API key for AI picks | *(leave blank if unused)* |

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js LTS (v18+)
- PostgreSQL instance or Neon connection string

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd Htbtask

# Install dependencies for both backend and frontend
npm run install:all
```

### 3. Environment Configuration
```bash
cp server/.env.example server/.env
# Edit server/.env with your DATABASE_URL and JWT_SECRET
```

### 4. Database Setup & Seed
```bash
npm run migrate
npm run seed
```

### 5. Start Development Servers
```bash
npm run dev
# Or start separately:
# npm run dev:server  (port 4000)
# npm run dev:client  (port 5173)
```
- Frontend UI: `http://localhost:5173`
- Backend Health: `http://localhost:4000/api/health`
