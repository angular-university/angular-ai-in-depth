import pino from 'pino';
import { AiMessage } from './models/ai-message.model.js';

const logger = pino({ name: 'ai-client' });

const AI_API_URL = 'https://api.openai.com/v1/chat/completions';
const AI_MODEL = process.env['AI_MODEL'] ?? 'gpt-4o-mini';

type AiApiResponse = {
  choices: { message: { content: string } }[];
};

export async function sendMessages(messages: AiMessage[]): Promise<string> {
  const apiKey = process.env['OPENAI_API_KEY'];

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  logger.info({ model: AI_MODEL, messageCount: messages.length }, 'Sending request to AI API');

  const response = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: AI_MODEL, messages }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    logger.error({ status: response.status, body: errorBody }, 'AI API request failed');
    throw new Error(`AI API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as AiApiResponse;
  const reply = data.choices[0]?.message?.content;

  if (!reply) {
    throw new Error('AI API returned an empty response');
  }

  logger.info('AI API response received successfully');
  return reply;
}
