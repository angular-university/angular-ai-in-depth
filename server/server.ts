import 'dotenv/config';
import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './logger';
import { root } from './routes/root';
import { signIn } from './routes/sign-in';
import { seedUsers } from './utils/seed-users';

const PORT = process.env['PORT'] ?? 9000;

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/', root);

app.post('/api/sign-in', signIn);

async function startServer() {
  await seedUsers();

  app.listen(PORT, () => {
    logger.info({ port: PORT }, 'Server running');
  });
}

startServer().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
