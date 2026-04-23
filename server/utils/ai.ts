import { logger } from '../logger';
import {  AiCompletionResponse } from '../ai.model';
import {AiMessage} from '../conversations-db';

export async function getAiCompletion(messages: AiMessage[]) {
  const apiKey = process.env['OPENAI_API_KEY'];

  if (!apiKey) {
    logger.error('OPENAI_API_KEY is not configured');
    throw new Error('AI service is not configured.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    logger.error({ status: response.status, body: errorBody }, 'AI API error');
    throw new Error('AI service returned an error.');
  }

  const data = await response.json() as AiCompletionResponse;
  const content = data.choices[0]?.message?.content;

  if (!content) {
    logger.error({ data }, 'Unexpected AI response shape');
    throw new Error('Unexpected response from AI service.');
  }

  return content;
}
