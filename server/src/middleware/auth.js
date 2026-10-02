import { verifyToken } from '../utils/jwt.js';

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.streamnest_auth;
  if (!token) {
    return res.status(401).json({
      error: { message: 'Authentication required', code: 'UNAUTHORIZED' }
    });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // Attach user payload to request
    next();
  } catch (error) {
    return res.status(401).json({
      error: { message: 'Invalid or expired token', code: 'UNAUTHORIZED' }
    });
  }
};
