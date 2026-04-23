import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { logger } from '../logger';
import { getSystemPrompt } from '../prompts';
import { conversationsDb, AiMessage } from '../conversations-db';
import { getAiCompletion } from '../utils/ai';

export async function startConversation(req: Request, res: Response) {
  const { promptId, message } = req.body ?? {};

  if (!promptId || typeof promptId !== 'string') {
    res.status(400).json({ message: 'promptId is required.' });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    res.status(400).json({ message: 'message is required.' });
    return;
  }

  const systemPrompt = getSystemPrompt(promptId);

  if (!systemPrompt) {
    res.status(400).json({ message: 'Unknown promptId.' });
    return;
  }

  const messages: AiMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: message.trim() },
  ];

  let assistantContent: string;

  try {
    assistantContent = await getAiCompletion(messages);
  } catch (err) {
    logger.error({ err }, 'Failed to get AI completion');
    res.status(502).json({ message: 'Could not reach AI service. Please try again.' });
    return;
  }

  const conversationId = randomUUID();

  conversationsDb.set(conversationId, {
    id: conversationId,
    messages: [
      ...messages,
      { role: 'assistant', content: assistantContent },
    ],
    createdAt: new Date(),
  });

  logger.info({ conversationId }, 'Conversation started');

  res.status(201).json({ conversationId, message: assistantContent });
}
