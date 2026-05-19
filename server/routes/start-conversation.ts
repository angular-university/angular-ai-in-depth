import { Request, Response } from 'express';
import { SYSTEM_PROMPTS } from '../prompts';
import { sendMessages } from '../ai-client';
import { StartConversationRequest } from '../models/start-conversation-request.model.js';
import { StartConversationResponse } from '../models/start-conversation-response.model.js';
import {createConversation} from '../db-data';

export async function startConversation(req: Request, res: Response) {
  const { promptId, message } = req.body as StartConversationRequest;

  if (!promptId || typeof promptId !== 'string') {
    res.status(400).json({ error: 'Missing required field: promptId' });
    return;
  }

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Missing required field: message' });
    return;
  }

  const systemPrompt = SYSTEM_PROMPTS[promptId];

  if (!systemPrompt) {
    res.status(400).json({ error: 'Unknown promptId' });
    return;
  }

  try {
    const reply = await sendMessages([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ]);

    const conversation = createConversation(promptId, message, reply);

    const responseBody: StartConversationResponse = {
      conversationId: conversation.id,
      reply,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    req.log.error({ error }, 'Failed to get AI response');
    res.status(502).json({ error: 'Failed to get a response from the AI service' });
  }
}
