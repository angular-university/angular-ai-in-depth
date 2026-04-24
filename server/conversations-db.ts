
import { mockConversations } from './mock-data';

export type AiMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type StoredConversation = {
  id: string;
  promptId: string;
  messages: AiMessage[];
  createdAt: Date;
};

export const conversationsDb = new Map<string, StoredConversation>();


for (const conversation of mockConversations) {
  conversationsDb.set(conversation.id, conversation);
}
