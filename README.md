# StreamNest

StreamNest is a modern, production-ready cinematic streaming platform. This project serves as a full-stack academic demonstration of robust architecture, security practices, and responsive design, built without using Netflix's branding or assets.

## Features

- **Robust Authentication**: JWT-based auth via secure, httpOnly cookies. Passwords hashed with bcrypt (cost 12). Strict Zod validation on endpoints. Brute-force protection via express-rate-limit.
- **Profiles**: Up to 5 profiles per account, with persistent UI-state management and "Kids" maturity filtering.
- **My List**: Add and remove titles to your personal list (idempotent operations, protected routes).
- **Intelligent Browse**: High-performance PostgreSQL text search (`pg_trgm`) and genre filtering. Cinematic billboard and scrollable rows.
- **AI Magic Picks**: Groq (Llama 3) integration provides personalized recommendations based on your current My List and a natural language prompt.
- **Security Hardening**: Helmet, strict CORS policies, payload size limits, and environment variable validation at boot.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router.
- **Backend**: Node.js, Express, `pg` (node-postgres), Zod, bcryptjs, jsonwebtoken.
- **Database**: PostgreSQL (Migrations and Idempotent Seeding built from scratch without ORMs).

## Local Development

### 1. Requirements
- Node.js 18+
- A PostgreSQL database (e.g., Neon free tier, Supabase, or local).

### 2. Setup
1. Clone the repository.
2. Run `npm install` in the root to install all workspaces.
3. Configure your backend `.env`:
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env and add your PostgreSQL DATABASE_URL
   ```
4. Run migrations and seed the database:
   ```bash
   npm --prefix server run migrate
   npm --prefix server run seed
   ```

### 3. Run
From the root directory:
```bash
npm run dev
```
This concurrently starts the Express backend on `http://localhost:4000` and the Vite frontend on `http://localhost:5173`. The Vite server automatically proxies `/api` requests to the backend.

## Production Deployment

### 1. Database (Neon / Supabase)
1. Create a free PostgreSQL instance.
2. Obtain the connection string (`DATABASE_URL`).

### 2. Backend (Render / Railway)
1. Connect your repository to a Web Service.
2. Set the Root Directory to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start` (or `node src/index.js`)
5. Environment Variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=<your-db-url>`
   - `JWT_SECRET=<generate-a-secure-random-string>`
   - `CLIENT_ORIGIN=<your-frontend-url>`
   - `GROQ_API_KEY=<optional-groq-key>`

### 3. Frontend (Vercel / Netlify)
1. Connect your repository.
2. Set the Root Directory to `client`.
3. Framework Preset: Vite.
4. Environment Variables:
   - `VITE_API_URL=<your-backend-url>/api`
5. **Important for Vercel**: Ensure routing falls back to `index.html`. Create a `vercel.json` in the `client` directory:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
