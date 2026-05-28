import { MessageRole } from './message-role.model.js';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
};
