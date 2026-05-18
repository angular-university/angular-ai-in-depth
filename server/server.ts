import 'dotenv/config';
import express from 'express';
import pinoHttp from 'pino-http';
import { rootRoute } from './routes/root.js';
import { getConversationsHistory } from './routes/get-conversations-history.js';

const app = express();
const port = process.env['PORT'] ?? 9000;

app.use(pinoHttp());
app.use(express.json());

app.get('/', rootRoute);
app.get('/api/get-chat-history', getConversationsHistory);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
