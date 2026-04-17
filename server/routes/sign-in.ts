import { Router } from 'express';
import argon2 from 'argon2';
import { users } from '../db-data';

export const signInRouter = Router();

signInRouter.post('/sign-in', async (req, res) => {
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
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  res.json({ user: { id: user!.id, email: user!.email } });
});
