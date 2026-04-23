import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { logger } from '../logger';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ message: 'Missing authentication token.' });
    return;
  }

  try {
    verifyJwt(token);
    next();
  } catch {
    logger.warn({ path: req.path }, 'Invalid or expired token');
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
