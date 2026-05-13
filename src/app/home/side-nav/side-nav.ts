import { Component, input, output } from '@angular/core';
import { Conversation } from '../conversation.model';
import { ChatHistory } from '../chat-history/chat-history';

@Component({
  selector: 'side-nav',
  imports: [ChatHistory],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  readonly collapsed = input.required<boolean>();
  readonly conversations = input.required<Conversation[]>();
  readonly activeConversationId = input.required<string | null>();

  readonly toggle = output<void>();
  readonly conversationSelected = output<string>();
  readonly newChat = output<void>();
  readonly logout = output<void>();
}
