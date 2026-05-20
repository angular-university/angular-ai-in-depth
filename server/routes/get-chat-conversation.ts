import { Request, Response } from 'express';
import { DB_CONVERSATIONS } from '../db-data.js';

export function getChatConversation(req: Request, res: Response) {
  const { id } = req.params;

  const conversation = DB_CONVERSATIONS.find(c => c.id === id);

  if (!conversation) {
    req.log.warn({ conversationId: id }, 'Conversation not found');
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  req.log.info({ conversationId: id, messageCount: conversation.messages.length }, 'Returning conversation');
  res.json({
    id: conversation.id,
    title: conversation.title,
    messages: conversation.messages.filter(m => m.role !== 'system'),
  });
}
