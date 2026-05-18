import 'dotenv/config';
import express from 'express';
import pinoHttp from 'pino-http';
import { rootRoute } from './routes/root.js';

const app = express();
const port = process.env['PORT'] ?? 9000;

app.use(pinoHttp());

app.get('/', rootRoute);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
