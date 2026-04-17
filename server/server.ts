import express from 'express';
import argon2 from 'argon2';
import { users } from './db-data';
import { signInRouter } from './routes/sign-in';

const PORT = process.env['PORT'] ?? 9000;

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Angular AI In Depth — Server</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 2rem; }
        </style>
      </head>
      <body>
        <h1>Server is running</h1>
        <p>Port: <strong>${PORT}</strong></p>
      </body>
    </html>
  `);
});

app.use('/api', signInRouter);

async function startServer() {
  // Seed in-memory users with argon2id-hashed passwords.
  // Argon2id defaults: m=65536 (64 MiB), t=3 iterations, p=4 parallelism — OWASP recommended.
  const seedUsers = [
    { id: '1', email: 'test@angular-university.io', password: 'angular' },
  ];

  for (const seed of seedUsers) {
    users.push({
      id: seed.id,
      email: seed.email,
      passwordHash: await argon2.hash(seed.password),
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
