import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { DB_USERS, createUser } from '../db-data.js';
import { SignUpRequest } from '../models/sign-up-request.model.js';
import { SignInResponse } from '../models/sign-in-response.model.js';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body as SignUpRequest;

  if (!email || typeof email !== 'string') {
    req.log.warn('Sign-up request missing email');
    res.status(400).json({ error: 'Missing required field: email' });
    return;
  }

  if (!password || typeof password !== 'string') {
    req.log.warn('Sign-up request missing password');
    res.status(400).json({ error: 'Missing required field: password' });
    return;
  }

  if (DB_USERS.some(u => u.email === email)) {
    req.log.warn({ email }, 'Sign-up attempted with already registered email');
    res.status(409).json({ error: 'An account with this email already exists' });
    return;
  }

  let passwordHash: string;
  try {
    passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
  } catch (error) {
    req.log.error({ error }, 'Error hashing password during sign-up');
    res.status(500).json({ error: 'Failed to create account' });
    return;
  }

  const user = createUser(email, passwordHash);

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

  req.log.info({ email }, 'User account created successfully');

  const response: SignInResponse = {
    token,
    user: { id: user.id, email: user.email },
  };

  res.status(201).json(response);
}
