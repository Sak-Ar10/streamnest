import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profiles.js';
import titleRoutes from './routes/titles.js';
import listRoutes from './routes/list.js';
import aiRoutes from './routes/ai.js';

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// Enforce JSON size limits and strict checking
app.use(express.json({ limit: '10kb', strict: true }));
app.use(cookieParser());

// Require JSON content type on mutating routes
app.use((req, res, next) => {
  if (['POST', 'PATCH', 'PUT'].includes(req.method) && req.headers['content-type'] !== 'application/json') {
    return res.status(415).json({ error: { message: 'Content-Type must be application/json' } });
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/profiles', listRoutes); // mount list routes here so path matches
app.use('/api/titles', titleRoutes);
app.use('/api/browse', titleRoutes); // Alias since prompt specifies /api/browse
app.use('/api/ai', aiRoutes);

// Health check endpoint (Used by Render, proxy, uptime monitors)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    app: 'StreamNest API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: {
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
      code: 'NOT_FOUND',
    },
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal server error',
      code: err.code || 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

export default app;
