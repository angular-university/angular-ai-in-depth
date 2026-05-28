import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { DB_USERS } from '../db-data.js';
import { SignInRequest } from '../models/sign-in-request.model.js';
import { SignInResponse } from '../models/sign-in-response.model.js';

// Pre-computed dummy hash used when user is not found to prevent timing attacks
const DUMMY_HASH = '$argon2id$v=19$m=19456,t=2,p=1$Upa9wDMIbwYGDuZ6Xiwz3w$jvcTPmGyCk9xLHO5TFSSp0KDqvbZaXQXrHnDhhrVtMY';

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as SignInRequest;

  if (!email || typeof email !== 'string') {
    req.log.warn('Sign-in request missing email');
    res.status(400).json({ error: 'Missing required field: email' });
    return;
  }

  if (!password || typeof password !== 'string') {
    req.log.warn('Sign-in request missing password');
    res.status(400).json({ error: 'Missing required field: password' });
    return;
  }

  const user = DB_USERS.find(u => u.email === email);

  // Always run argon2.verify even when user is not found to prevent timing attacks
  let passwordValid = false;
  try {
    passwordValid = await argon2.verify(user?.passwordHash ?? DUMMY_HASH, password);
  } catch (error) {
    req.log.error({ error }, 'Error verifying password');
    res.status(500).json({ error: 'Authentication failed' });
    return;
  }

  if (!user || !passwordValid) {
    req.log.warn({ email }, 'Invalid credentials');
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const jwtSecret = process.env['JWT_SECRET'];
  if (!jwtSecret) {
    req.log.error('JWT_SECRET environment variable is not set');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    jwtSecret,
    { algorithm: 'HS256', expiresIn: '7d' },
  );

  await new Promise(resolve => setTimeout(resolve, 1500));

  req.log.info({ email }, 'User signed in successfully');

  const response: SignInResponse = {
    token,
    user: { id: user.id, email: user.email },
  };

  res.json(response);
}
