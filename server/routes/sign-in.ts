import { Request, Response } from 'express';
import argon2 from 'argon2';
import { users } from '../db-data';
import { logger } from '../logger';
import { signJwt } from '../utils/jwt';

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  const user = users.find(u => u.email === email);

  // Same error for unknown user and wrong password to prevent user enumeration
  const valid = user
    ? await argon2.verify(user.passwordHash, password)
    : false;

  if (!valid) {
    logger.warn({ email }, 'Failed sign-in attempt');
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  const token = signJwt({ sub: user!.id, email: user!.email });

  logger.info({ email, userId: user!.id }, 'User signed in');
  res.json({ token, user: { id: user!.id, email: user!.email } });
}
