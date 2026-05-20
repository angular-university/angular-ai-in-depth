import { Request, Response } from 'express';
import {appendMessages, DB_CONVERSATIONS} from '../db-data';
import { SYSTEM_PROMPTS } from '../prompts';
import { sendMessages } from '../ai-client';
import { ContinueConversationRequest } from '../models/continue-conversation-request.model.js';
import { ContinueConversationResponse } from '../models/continue-conversation-response.model.js';

export async function continueConversation(req: Request, res: Response) {
  const { conversationId, message } = req.body as ContinueConversationRequest;

  if (!conversationId || typeof conversationId !== 'string') {
    res.status(400).json({ error: 'Missing required field: conversationId' });
    return;
  }

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Missing required field: message' });
    return;
  }

  const conversation = DB_CONVERSATIONS.find(c => c.id === conversationId);

  if (!conversation) {
    res.status(404).json({ error: 'Conversation not found' });
    return;
  }

  const systemPrompt = SYSTEM_PROMPTS[conversation.promptId];

  if (!systemPrompt) {
    res.status(500).json({ error: 'System prompt configuration error' });
    return;
  }

  try {
    const reply = await sendMessages([
      { role: 'system', content: systemPrompt },
      ...conversation.messages.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: message },
    ]);

    appendMessages(conversationId, message, reply);

    const responseBody: ContinueConversationResponse = { reply };
    res.json(responseBody);
  } catch (error) {
    req.log.error({ error }, 'Failed to get AI response');
    res.status(502).json({ error: 'Failed to get a response from the AI service' });
  }
}
