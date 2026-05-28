import { ChatMessage } from './chat-message.model';

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
};
