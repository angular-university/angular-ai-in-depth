import { MessageRole } from './message-role.model.js';

export type AiMessage = {
  role: MessageRole;
  content: string;
};
