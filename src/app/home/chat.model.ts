export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
};

export type StartConversationResponse = {
  conversationId: string;
  message: string;
};

export type ContinueConversationResponse = {
  message: string;
};
