import bcrypt from 'bcryptjs';
import { query, getClient } from '../config/db.js';
import { HttpError } from '../utils/httpError.js';

const SALT_ROUNDS = 12;

export const signupUser = async ({ name, email, password }) => {
  const emailLower = email.toLowerCase();

  // Check if user exists
  const existing = await query(`SELECT id FROM users WHERE email = $1`, [emailLower]);
  if (existing.rowCount > 0) {
    throw new HttpError(409, 'Email already in use', 'CONFLICT');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const client = await getClient();
  try {
    // We use a transaction because we need to insert user and a default profile
    await client.query('BEGIN');
    
    const userRes = await client.query(
      `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
      [name, emailLower, passwordHash]
    );
    const user = userRes.rows[0];

    // Create default profile
    await client.query(
      `INSERT INTO profiles (user_id, name, avatar, is_kids) VALUES ($1, $2, $3, $4)`,
      [user.id, name, 'avatar_indigo', false]
    );

    await client.query('COMMIT');
    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const loginUser = async ({ email, password }) => {
  const emailLower = email.toLowerCase();
  
  const res = await query(
    `SELECT id, name, email, password_hash FROM users WHERE email = $1`,
    [emailLower]
  );
  const user = res.rows[0];

  // Generic error for security
  if (!user) {
    throw new HttpError(401, 'Invalid email or password', 'UNAUTHORIZED');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new HttpError(401, 'Invalid email or password', 'UNAUTHORIZED');
  }

  // Do not return hash
  delete user.password_hash;
  return user;
};

export const getUserById = async (id) => {
  const res = await query(
    `SELECT id, name, email, created_at FROM users WHERE id = $1`,
    [id]
  );
  if (res.rowCount === 0) {
    throw new HttpError(401, 'User not found', 'UNAUTHORIZED');
  }
  return res.rows[0];
};
