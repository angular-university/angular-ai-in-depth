export type AiMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type StoredConversation = {
  id: string;
  messages: AiMessage[];
  createdAt: Date;
};

export const conversationsDb = new Map<string, StoredConversation>();
