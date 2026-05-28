import 'dotenv/config';
import express from 'express';
import pinoHttp from 'pino-http';
import { rootRoute } from './routes/root.js';
import { getConversationsHistory } from './routes/get-conversations-history.js';
import { getChatConversation } from './routes/get-chat-conversation.js';
import { startConversation } from './routes/start-conversation.js';
import { continueConversation } from './routes/continue-conversation.js';
import { signIn } from './routes/sign-in.js';
import { signUp } from './routes/sign-up.js';
import { requireAuth } from './middleware/auth.middleware.js';

const app = express();
const port = process.env['PORT'] ?? 9000;

app.use(pinoHttp());
app.use(express.json());

app.get('/', rootRoute);
app.get('/api/get-chat-history', requireAuth, getConversationsHistory);
app.get('/api/get-chat-conversation/:id', requireAuth, getChatConversation);
app.post('/api/start-conversation', requireAuth, startConversation);
app.post('/api/continue-conversation', requireAuth, continueConversation);
app.post('/api/sign-in', signIn);
app.post('/api/sign-up', signUp);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
