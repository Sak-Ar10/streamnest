# 🎬 StreamNest

<div align="center">

  <img src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&auto=format&fit=crop&q=80" alt="StreamNest Banner" width="100%" style="border-radius: 12px; max-height: 380px; object-fit: cover;" />

  <br /><br />

  <p align="center">
    <strong>A modern, production-grade cinematic streaming platform engineered for seamless entertainment discovery.</strong>
  </p>

  <p align="center">
    <a href="https://streamnest-two.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-streamnest--two.vercel.app-E50914?style=for-the-badge" alt="Live Demo" />
    </a>
    <a href="https://github.com/Sak-Ar10/streamnest" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
    <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/AI-Groq_%7C_Llama_3-F55036?style=flat-square" alt="Groq Llama 3" />
    <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License: MIT" />
  </p>

</div>

---

## 🌐 Live Application & Quick Links

| Resource | URL | Description |
| :--- | :--- | :--- |
| **Production App (Primary)** | [**https://streamnest-two.vercel.app**](https://streamnest-two.vercel.app) | Live production application running on Vercel Edge + Neon DB |
| **Vercel Mirror Alias** | [**https://streamnest-sak-ar.vercel.app**](https://streamnest-sak-ar.vercel.app) | Secondary production alias |
| **API Health Check** | [`https://streamnest-two.vercel.app/api/health`](https://streamnest-two.vercel.app/api/health) | Live serverless backend status & uptime probe |
| **Source Code** | [**github.com/Sak-Ar10/streamnest**](https://github.com/Sak-Ar10/streamnest) | Official Git repository |

---

## 📖 Table of Contents

- [Executive Summary](#-executive-summary)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Database Architecture & ERD](#-database-architecture--erd)
- [RESTful API Specification](#-restful-api-specification)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Production Deployment](#-production-deployment)
- [Security Hardening & Best Practices](#-security-hardening--best-practices)
- [License](#-license)

---

## ⚡ Executive Summary

**StreamNest** is a full-stack, cloud-native streaming web application that re-imagines the modern entertainment browsing experience. Crafted with high attention to performance, security, and developer ergonomics, it pairs a responsive, dark-mode React interface with an Express serverless microservice and a high-performance Neon PostgreSQL database.

The project demonstrates:
- **Zero Third-Party Trademark Dependencies**: Completely custom identity, UI system, and original metadata design.
- **Enterprise-Grade Security Posture**: `httpOnly` cookie JWT tokens, bcrypt cost-12 hashing, Zod schema validation, Helmet headers, and CORS restrictions.
- **Intelligent Discovery**: PostgreSQL trigram similarity search combined with Groq-accelerated Llama 3 recommendations based on profile behavior.

---

## ✨ Key Features

### 🎬 Cinematic Browse & Playback UI
- **Billboard Hero Showcase**: Dynamic, immersive top banner presenting featured titles with background art, rating, overview, and quick action buttons.
- **Categorized Streaming Carousels**: Smooth, responsive horizontal title rows by genre (Action, Sci-Fi, Drama, Anime, etc.).
- **Rich Media Preview Modal**: Modal detail popup rendering high-definition backdrops, maturity ratings, runtime, release year, genres, full overview synopsis, and embedded YouTube trailer playback.

### 👤 Multi-Profile Management
- Up to **5 unique profiles** per user account.
- Individual profile names and custom color-coded avatar selection.
- **Kids Mode Filtering**: Profile-level maturity restriction that automatically filters out adult-rated titles (e.g., `TV-MA`, `R`, `18+`).
- Persistent active profile selection synchronized across browser sessions and API calls.

### 🔖 Personalized "My List"
- Instant, optimistic one-click bookmarking of movies and television series.
- Isolated watchlist per profile, powered by an idempotent PostgreSQL junction relationship.
- Dedicated **My List** view with immediate filtering and item removal.

### 🔍 Real-Time Intelligent Search
- Fast, fuzzy keyword search powered by PostgreSQL GIN Trigram (`pg_trgm`) indexes.
- Dynamically matches movie titles, genres, and overviews without expensive full-table scans.
- Respects active profile maturity filters during search queries.

### 🤖 AI "Magic Picks" (Powered by Groq & Llama 3)
- Natural language query recommendation engine.
- Pulls the active profile's current "My List" watch history as few-shot contextual memory.
- Uses Groq's low-latency inference engine with **Llama 3-8B** to formulate recommendations and maps them to catalog titles in real time.

### 🛡️ Robust Security Hardening
- **Authentication**: Stateless JSON Web Tokens (JWT) transmitted strictly via secure, `httpOnly`, `SameSite=Lax` cookies to prevent XSS credential interception.
- **Brute-Force Rate Limiting**: Endpoint-specific rate limiting via `express-rate-limit`.
- **Strict Input Validation**: Runtime payload validation with `zod` schemas on all mutating endpoints.
- **Defensive Headers**: `helmet` enabled to enforce CSP, HSTS, frame protection, and referrer policies.
- **Payload & Content Control**: Rejection of requests exceeding 10KB and enforcement of `Content-Type: application/json` on mutation routes (HTTP 415).

---

## 🛠 Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│                   Client Layer (SPA)                   │
│   React 18 · Vite · Tailwind CSS · React Router 6       │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTPS / Credentials (Cookies)
┌──────────────────────────▼─────────────────────────────┐
│                 Serverless API Layer                   │
│         Express 4.21 · Node.js · Vercel Functions       │
│   Helmet · CORS · Zod Validation · JWT · bcryptjs      │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               │ PostgreSQL Wire (SSL)    │ HTTPS
┌──────────────▼─────────────┐   ┌────────▼──────────────┐
│  Neon Serverless Postgres  │   │     Groq Cloud AI     │
│   pg_trgm · pgcrypto       │   │  Llama 3-8B Inference │
└────────────────────────────┘   └───────────────────────┘
```

| Area | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) | Component architecture, fast concurrent rendering |
| **Build Tooling** | [Vite 5](https://vitejs.dev/) | Instant HMR and optimized production bundles |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first responsive dark-mode styling |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible iconography |
| **Routing** | [React Router 6](https://reactrouter.com/) | Client-side routing with protected route guards |
| **Backend Framework** | [Express 4](https://expressjs.com/) | RESTful API routing and middleware composition |
| **Serverless Engine** | [Vercel Functions](https://vercel.com/docs/functions) | Low-latency edge-distributed Node runtime |
| **Database** | [Neon PostgreSQL](https://neon.tech/) | Serverless cloud PostgreSQL with SSL pooling |
| **DB Client** | [node-postgres (`pg`)](https://node-postgres.com/) | Native, zero-ORM SQL execution with connection pooling |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing (salt cost 12) + HTTP-only JWT |
| **Validation** | [Zod](https://zod.dev/) | Type-safe declarative schema validation |
| **AI Recommendations** | [Groq Cloud](https://groq.com/) | Fast LLM inference executing Meta Llama 3 |

---

## 🗄 Database Architecture & ERD

The database schema is constructed natively without heavy ORM overhead, ensuring query transparency and optimal index utilization.

```mermaid
erDiagram
    USERS ||--o{ PROFILES : owns
    PROFILES ||--o{ MY_LIST : tracks
    TITLES ||--o{ MY_LIST : "included in"
    TITLES ||--o{ TITLE_GENRES : categorized
    GENRES ||--o{ TITLE_GENRES : classifies

    USERS {
        uuid id PK
        varchar name
        varchar email UK
        varchar password_hash
        timestamptz created_at
    }

    PROFILES {
        uuid id PK
        uuid user_id FK
        varchar name
        varchar avatar
        boolean is_kids
        timestamptz created_at
    }

    TITLES {
        uuid id PK
        integer tmdb_id UK
        varchar type "movie | series"
        varchar title
        text overview
        integer release_year
        varchar maturity_rating
        integer runtime_minutes
        integer seasons
        text poster_url
        text backdrop_url
        varchar trailer_youtube_id
        numeric rating
        boolean is_featured
        timestamptz created_at
    }

    GENRES {
        uuid id PK
        varchar name UK
    }

    TITLE_GENRES {
        uuid title_id PK, FK
        uuid genre_id PK, FK
    }

    MY_LIST {
        uuid profile_id PK, FK
        uuid title_id PK, FK
        timestamptz added_at
    }
```

### High-Performance Indexing
- `idx_titles_title_trgm`: PostgreSQL GIN Trigram index on `titles(title)` for sub-millisecond fuzzy substring queries.
- `idx_users_email`: B-tree index on user email addresses for $O(1)$ login lookups.
- `idx_profiles_user_id`: Foreign-key indexing enabling instantaneous user profile list fetches.
- `idx_title_genres_genre_id`: Fast junction lookup for genre-filtered catalog queries.

---

## 📡 RESTful API Specification

All protected endpoints expect a signed session token located within the `jwt` HTTP-only cookie.

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Register a new user account and set auth cookie | ❌ |
| `POST` | `/api/auth/login` | Authenticate credentials and issue session cookie | ❌ |
| `POST` | `/api/auth/logout` | Clear the session cookie and revoke access | ❌ |
| `GET` | `/api/auth/me` | Fetch currently authenticated user payload | ✅ |

### Profiles (`/api/profiles`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/profiles` | List all profiles belonging to the current user (max 5) | ✅ |
| `POST` | `/api/profiles` | Create a new user profile with avatar and kids toggle | ✅ |
| `PUT` | `/api/profiles/:id` | Update profile display name, avatar, or kids setting | ✅ |
| `DELETE` | `/api/profiles/:id` | Permanently delete a profile and its saved lists | ✅ |

### Titles & Browsing (`/api/titles`, `/api/browse`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/titles` | Fetch titles catalog with optional `genre`, `type`, and `search` filters | ✅ |
| `GET` | `/api/titles/:id` | Retrieve comprehensive title details and metadata | ✅ |
| `GET` | `/api/browse` | Fetch curated categorized catalog grouped by genre | ✅ |

### Personalized Watchlist (`/api/profiles/:profileId/list`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/profiles/:profileId/list` | Retrieve all titles saved in the specified profile's list | ✅ |
| `POST` | `/api/profiles/:profileId/list` | Add a title to the profile's watchlist (idempotent) | ✅ |
| `DELETE` | `/api/profiles/:profileId/list/:titleId` | Remove a title from the profile's watchlist | ✅ |

### AI Recommendations (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/ai/recommendations` | Generate Llama 3 contextual recommendations based on prompt & list | ✅ |

### System & Health (`/api/health`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Uptime check returning status, environment, and server timestamp | ❌ |

---

## 📂 Project Directory Structure

```plaintext
streamnest/
├── api/                       # Vercel Serverless Function entry point
│   └── index.js               # Express app bridge for serverless edge
├── client/                    # React 18 + Vite frontend SPA
│   ├── public/                # Static assets & favicon
│   ├── src/
│   │   ├── api/               # Axios/Fetch API client wrapper
│   │   ├── components/        # Reusable UI widgets (Navbar, TitleCard, Modal, AI, etc.)
│   │   ├── context/           # React Context (AuthContext, ProfileContext)
│   │   ├── pages/             # Route views (Landing, Browse, MyList, Search, Login, etc.)
│   │   ├── routes/            # ProtectedRoute and GuestOnlyRoute guards
│   │   ├── config.js          # Client configuration & environment constants
│   │   ├── index.css          # Tailwind CSS directives & custom styling
│   │   └── main.jsx           # React DOM root initialization
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                    # Node.js Express backend
│   ├── migrations/            # SQL DDL migrations
│   │   └── 001_init.sql       # Baseline schema definition & trigram extensions
│   ├── scripts/               # Automation & testing utilities
│   │   ├── migrate.js         # Automated schema migration executor
│   │   ├── seed.js            # Idempotent database seed loader
│   │   ├── seed.json          # Pre-packaged movie & TV title catalog
│   │   └── test_auth.js       # End-to-end auth test script
│   ├── src/
│   │   ├── config/            # Environment & database connection pooling
│   │   ├── controllers/       # HTTP route handlers
│   │   ├── middleware/        # Authentication, validation, and rate limiting
│   │   ├── routes/            # Express router modules
│   │   ├── services/          # Core business logic & database queries
│   │   ├── utils/             # Helper functions (JWT sign/verify, custom errors)
│   │   ├── app.js             # Express application setup
│   │   └── index.js           # Local standalone HTTP server listener
│   └── package.json
├── scripts/                   # Workspace development runners
│   └── dev.js                 # Concurrent client + server dev launcher
├── package.json               # Root workspace manifest & orchestration scripts
├── vercel.json                # Vercel monorepo deployment & routing manifest
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: Local instance or free cloud database (e.g., [Neon](https://neon.tech), [Supabase](https://supabase.com))

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/Sak-Ar10/streamnest.git
cd streamnest

# Install root, server, and client dependencies
npm run install:all
```

### 3. Environment Configuration
Create a `.env` file in the root directory and in `server/`:

```bash
# In the root or server directory
cp server/.env.example server/.env
```

Populate the required environment variables:

```ini
# Server Configuration (server/.env or root .env)
PORT=4000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/streamnest?sslmode=prefer
JWT_SECRET=super_secret_jwt_key_at_least_32_characters_long!
CLIENT_ORIGIN=http://localhost:5173

# Optional: Groq AI integration for Magic Picks
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 4. Database Migration & Seeding
Execute the SQL migrations and seed the database with catalog titles:

```bash
# Run SQL migrations
npm run migrate

# Seed catalog titles and genres (idempotent)
npm run seed
```

### 5. Launch Development Servers
Run both the Express backend and the Vite frontend concurrently with one command:

```bash
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:4000`
- **API Health**: `http://localhost:4000/api/health`

### 6. Run Auth Verification Suite
You can verify that signup, login, session cookies, duplicate checking, and `/me` authorization work as expected:

```bash
node server/scripts/test_auth.js
```

---

## ☁️ Production Deployment

StreamNest is engineered for effortless continuous deployment to **Vercel** with a **Neon** PostgreSQL database.

### 1. Neon Cloud Database
1. Create a serverless PostgreSQL instance on [Neon](https://neon.tech).
2. Copy the pooled connection string (`postgres://...sslmode=require`).

### 2. Vercel Full-Stack Deployment
The root [`vercel.json`](./vercel.json) is pre-configured to build the Vite client and bundle the Express application into a serverless API function:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "client/dist",
  "functions": {
    "api/index.js": {
      "includeFiles": "server/**",
      "maxDuration": 15
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Required Vercel Environment Variables:
Configure the following in **Vercel Project Settings > Environment Variables**:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `production` |
| `DATABASE_URL` | Pooled connection string to Neon | `postgres://user:pass@ep-xyz-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | Cryptographic secret for signing JWTs | `a_very_secure_random_string_min_32_chars` |
| `CLIENT_ORIGIN` | Allowed CORS origin | `https://streamnest-two.vercel.app` |
| `GROQ_API_KEY` | *(Optional)* Groq Cloud API Key | `gsk_...` |

Once configured, any push to `main` triggers an automatic deployment.

---

## 🔒 Security Hardening & Best Practices

StreamNest is hardened in accordance with OWASP security recommendations:

1. **Authentication Token Storage**: Authentication tokens are never exposed to browser `localStorage` or `sessionStorage` where they are vulnerable to XSS. They are transmitted exclusively through `httpOnly`, `Secure`, `SameSite=Lax` cookies.
2. **Password Cryptography**: Passwords are never stored in plaintext. They are salted and hashed using **bcrypt** with a salt work factor of 12.
3. **Strict Validation Pipeline**: Input payloads are strongly validated at the network perimeter via **Zod** schemas before reaching controllers or database queries.
4. **Injection Prevention**: All database interactions use parameterized SQL statements via `node-postgres`, preventing SQL injection vulnerabilities.
5. **Rate Limiting**: Authentication and sensitive endpoints enforce window-based request rate limiting to mitigate brute-force attacks.
6. **Defensive HTTP Headers**: Powered by `helmet`, enforcing `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, Strict-Transport-Security (HSTS), and referrer policies.
7. **Payload Protection**: Express JSON body size is bounded to `10kb` to protect the server from memory exhaustion denial-of-service (DoS) payloads.

---

## 📄 License

This project is licensed under the terms of the **MIT License**. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Crafted with passion for cinematic entertainment and modern web engineering.</sub>
  <br />
  <strong><a href="https://streamnest-two.vercel.app">Experience StreamNest Live →</a></strong>
</div>
