import { ChatMessage } from './chat-message.model.js';

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
};
