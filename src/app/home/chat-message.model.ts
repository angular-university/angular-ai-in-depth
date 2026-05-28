import { MessageRole } from './message-role.model';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
};
