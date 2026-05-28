import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  userId: string;
  email: string;
};

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    req.log.warn('Request missing Authorization Bearer token');
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const token = authHeader.slice(7);
  const jwtSecret = process.env['JWT_SECRET'];

  if (!jwtSecret) {
    req.log.error('JWT_SECRET environment variable is not set');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  try {
    const payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] }) as JwtPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    req.log.warn({ error }, 'Invalid or expired JWT');
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
