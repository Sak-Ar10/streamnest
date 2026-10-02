import { signupUser, loginUser, getUserById } from '../services/authService.js';
import { generateToken } from '../utils/jwt.js';

const COOKIE_NAME = 'streamnest_auth';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const signup = async (req, res) => {
  const user = await signupUser(req.body);
  const token = generateToken({ id: user.id });
  
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  res.status(201).json({ user });
};

export const login = async (req, res) => {
  const user = await loginUser(req.body);
  const token = generateToken({ id: user.id });
  
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
  res.status(200).json({ user });
};

export const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  const userId = req.user.id;
  const user = await getUserById(userId);
  res.status(200).json({ user });
};
