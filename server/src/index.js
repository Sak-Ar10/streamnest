import dotenv from 'dotenv';
dotenv.config();
import './config/env.js';

import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[StreamNest Server] Running on http://localhost:${PORT}`);
  console.log(`[StreamNest Server] Health endpoint: http://localhost:${PORT}/api/health`);
});
