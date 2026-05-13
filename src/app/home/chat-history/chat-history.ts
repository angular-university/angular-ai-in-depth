import { Component, input, output } from '@angular/core';
import { Conversation } from '../conversation.model';

@Component({
  selector: 'chat-history',
  templateUrl: './chat-history.html',
  styleUrl: './chat-history.scss',
})
export class ChatHistory {
  readonly conversations = input.required<Conversation[]>();
  readonly activeConversationId = input.required<string | null>();

  readonly conversationSelected = output<string>();
}
