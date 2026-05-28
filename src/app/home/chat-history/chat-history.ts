import { Component, input, output } from '@angular/core';
import { ConversationSummary } from '../conversation-summary.model';

@Component({
  selector: 'chat-history',
  templateUrl: './chat-history.html',
  styleUrl: './chat-history.scss',
})
export class ChatHistory {
  readonly conversations = input.required<ConversationSummary[]>();
  readonly activeConversationId = input.required<string | null>();

  readonly conversationSelected = output<string>();
}
