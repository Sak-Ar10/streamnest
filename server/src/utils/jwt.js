import jwt from 'jsonwebtoken';
import { HttpError } from './httpError.js';

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing in environment variables');
  }
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new HttpError(401, 'Invalid or expired token', 'UNAUTHORIZED');
  }
};
