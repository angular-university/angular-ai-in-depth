export type AiCompletionResponse = {
  choices: Array<{
    message: { role: string; content: string };
    finish_reason: string;
  }>;
};
