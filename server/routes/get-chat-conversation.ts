import { Request, Response } from 'express';
import { DB_CONVERSATIONS } from '../db-data.js';

export function getChatConversation(req: Request, res: Response) {
  const { id } = req.params;

  const conversation = DB_CONVERSATIONS.find(c => c.id === id);

  if (!conversation) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  res.json({
    ...conversation,
    messages: conversation.messages.filter(m => m.role !== 'system'),
  });
}
