import { Request, Response } from 'express';
import { SYSTEM_PROMPTS } from '../prompts';
import { sendMessages } from '../ai-client';
import { StartConversationRequest } from '../models/start-conversation-request.model.js';
import { StartConversationResponse } from '../models/start-conversation-response.model.js';
import {createConversation} from '../db-data';

export async function startConversation(req: Request, res: Response) {
  const { promptId, message } = req.body as StartConversationRequest;

  if (!promptId || typeof promptId !== 'string') {
    req.log.warn('Start conversation request missing promptId');
    res.status(400).json({ error: 'Missing required field: promptId' });
    return;
  }

  if (!message || typeof message !== 'string') {
    req.log.warn({ promptId }, 'Start conversation request missing message');
    res.status(400).json({ error: 'Missing required field: message' });
    return;
  }

  const systemPrompt = SYSTEM_PROMPTS[promptId];

  if (!systemPrompt) {
    req.log.warn({ promptId }, 'Unknown promptId');
    res.status(400).json({ error: 'Unknown promptId' });
    return;
  }

  req.log.info({ promptId }, 'Starting new conversation');

  try {
    const reply = await sendMessages([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ]);

    const conversation = createConversation(promptId, message, reply);
    req.log.info({ conversationId: conversation.id, promptId }, 'Conversation created successfully');

    const responseBody: StartConversationResponse = {
      conversationId: conversation.id,
      reply,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    req.log.error({ error, promptId }, 'Failed to get AI response while starting conversation');
    res.status(502).json({ error: 'Failed to get a response from the AI service' });
  }
}
