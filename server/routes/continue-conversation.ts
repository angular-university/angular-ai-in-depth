import { Request, Response } from 'express';
import {appendMessages, DB_CONVERSATIONS} from '../db-data';
import { SYSTEM_PROMPTS } from '../prompts';
import { sendMessages } from '../ai-client';
import { ContinueConversationRequest } from '../models/continue-conversation-request.model.js';
import { ContinueConversationResponse } from '../models/continue-conversation-response.model.js';

export async function continueConversation(req: Request, res: Response) {
  const { conversationId, message } = req.body as ContinueConversationRequest;

  if (!conversationId || typeof conversationId !== 'string') {
    req.log.warn('Continue conversation request missing conversationId');
    res.status(400).json({ error: 'Missing required field: conversationId' });
    return;
  }

  if (!message || typeof message !== 'string') {
    req.log.warn({ conversationId }, 'Continue conversation request missing message');
    res.status(400).json({ error: 'Missing required field: message' });
    return;
  }

  const conversation = DB_CONVERSATIONS.find(c => c.id === conversationId);

  if (!conversation) {
    req.log.warn({ conversationId }, 'Conversation not found');
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  const systemPrompt = SYSTEM_PROMPTS[conversation.promptId];

  if (!systemPrompt) {
    req.log.error({ conversationId, promptId: conversation.promptId }, 'System prompt not found for conversation');
    res.status(500).json({ error: 'System prompt configuration error' });
    return;
  }

  req.log.info({ conversationId, existingMessages: conversation.messages.length }, 'Continuing conversation');

  try {
    const reply = await sendMessages([
      { role: 'system', content: systemPrompt },
      ...conversation.messages.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: message },
    ]);

    appendMessages(conversationId, message, reply);
    req.log.info({ conversationId }, 'Conversation updated successfully');

    const responseBody: ContinueConversationResponse = { reply };
    res.json(responseBody);
  } catch (error) {
    req.log.error({ error, conversationId }, 'Failed to get AI response while continuing conversation');
    res.status(502).json({ error: 'Failed to get a response from the AI service' });
  }
}
