import { Conversation } from './models/conversation.model.js';
import { ChatMessage } from './models/chat-message.model.js';

export const DB_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    promptId: 'angular-assistant',
    title: 'What are the new features in Angular 19?',
    messages: [
      { id: 'm1-1', role: 'user', content: 'What are the new features and improvements in Angular 19?' },
      {
        id: 'm1-2',
        role: 'assistant',
        content:
          'Angular 19 introduces several exciting improvements including enhanced standalone component support, improved SSR hydration, and significant bundle size optimisations.',
      },
      { id: 'm1-3', role: 'user', content: 'What about the new signals APIs in Angular 19?' },
      {
        id: 'm1-4',
        role: 'assistant',
        content:
          'Angular 19 expands the signals ecosystem with linkedSignal, resource(), and improvements to toSignal() — making fully reactive, zoneless apps possible without RxJS.',
      },
    ],
  },
  {
    id: '2',
    promptId: 'angular-assistant',
    title: 'How to create a component in Angular',
    messages: [
      { id: 'm2-1', role: 'user', content: 'How do I create a component in Angular?' },
      {
        id: 'm2-2',
        role: 'assistant',
        content:
          'Use the CLI: ng generate component my-component. In modern Angular, generated components are standalone by default.',
      },
    ],
  },
  {
    id: '3',
    promptId: 'angular-assistant',
    title: 'Angular routing how it works',
    messages: [
      { id: 'm3-1', role: 'user', content: 'Can you explain how Angular routing works?' },
      {
        id: 'm3-2',
        role: 'assistant',
        content:
          "Angular's router maps URL paths to components via a Routes array. Use provideRouter() in app.config.ts and place a <router-outlet> where routed components should render.",
      },
    ],
  },
  {
    id: '4',
    promptId: 'angular-assistant',
    title: 'What is a service in Angular',
    messages: [
      {
        id: 'm4-1',
        role: 'user',
        content: 'What is a service in Angular and when should I use one?',
      },
      {
        id: 'm4-2',
        role: 'assistant',
        content:
          'A service is an @Injectable class for shared logic, state, or data access. Use services when multiple components need the same data, or to separate business logic from the UI.',
      },
    ],
  },
  {
    id: '5',
    promptId: 'angular-assistant',
    title: 'Angular signals explained',
    messages: [
      {
        id: 'm5-1',
        role: 'user',
        content: 'Can you explain Angular signals and how they differ from RxJS?',
      },
      {
        id: 'm5-2',
        role: 'assistant',
        content:
          'Signals are synchronous reactive primitives — you read the current value by calling the signal as a function. Unlike RxJS, there are no subscriptions, no operators, and no memory leak risk.',
      },
    ],
  },
];

export function createConversation(promptId: string, userMessage: string, assistantReply: string): Conversation {
  const title = userMessage.length > 60 ? userMessage.slice(0, 60) + '...' : userMessage;
  const conversationId = crypto.randomUUID();

  const messages: ChatMessage[] = [
    { id: crypto.randomUUID(), role: 'user', content: userMessage },
    { id: crypto.randomUUID(), role: 'assistant', content: assistantReply },
  ];

  const conversation: Conversation = { id: conversationId, title, promptId, messages };
  DB_CONVERSATIONS.push(conversation);
  return conversation;
}
