import { Request, Response } from 'express';
import { DB_CONVERSATIONS } from '../db-data.js';
import { ConversationSummary } from '../models/conversation-summary.model.js';

export function getConversationsHistory(req: Request, res: Response) {
  const summaries: ConversationSummary[] = DB_CONVERSATIONS.map(({ id, title }) => ({ id, title }));
  req.log.info({ count: summaries.length }, 'Returning conversation history');
  res.json(summaries);
}
