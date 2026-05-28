export type MessageType = 'error' | 'warning' | 'info' | 'success';

export type UserMessage = {
  id: string;
  type: MessageType;
  text: string;
};
