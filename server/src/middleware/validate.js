import { z } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fields = error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }));
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          fields
        }
      });
    }
    next(error);
  }
};
