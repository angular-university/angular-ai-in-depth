import { Request, Response } from 'express';
import argon2 from 'argon2';
import { users } from '../db-data';
import { logger } from '../logger';
import { signJwt } from '../utils/jwt';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  const existing = users.find(u => u.email === email);

  if (existing) {
    logger.warn({ email }, 'Sign-up attempted with already registered email');
    res.status(409).json({ message: 'An account with this email already exists.' });
    return;
  }

  const passwordHash = await argon2.hash(password);
  const user = { id: crypto.randomUUID(), email, passwordHash };

  users.push(user);

  const token = signJwt({ sub: user.id, email: user.email });

  logger.info({ email, userId: user.id }, 'User created');
  res.status(201).json({ token });
}
