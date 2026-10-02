import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../migrations');
  
  try {
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log(`Found ${files.length} migration files.`);

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (const file of files) {
        console.log(`Running migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
        await client.query(sql);
      }

      await client.query('COMMIT');
      console.log('Migrations completed successfully.');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Migration failed, rolled back.', err);
      process.exit(1);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Failed to run migrations:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
