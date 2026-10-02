import pg from 'pg';
import { Pool as NeonPool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure env variables are loaded
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const isNeon = Boolean(process.env.DATABASE_URL?.includes('neon.tech'));
const isLocal =
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes('localhost') ||
  process.env.DATABASE_URL.includes('127.0.0.1');

const pool = isNeon
  ? new NeonPool({ connectionString: process.env.DATABASE_URL })
  : new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
    });

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();
export default pool;
