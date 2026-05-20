import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ChatMessage } from './chat-message.model';
import { Conversation } from './conversation.model';
import { ConversationSummary } from './conversation-summary.model';
import { MOCK_AI_RESPONSES } from './mock-data';
import { ChatHistoryService } from './chat-history.service';
import { SideNav } from './side-nav/side-nav';
import { InitialState } from './initial-state/initial-state';
import { ConversationThread } from './conversation-thread/conversation-thread';

@Component({
  selector: 'home',
  imports: [SideNav, InitialState, ConversationThread],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private chatHistoryService = inject(ChatHistoryService);

  readonly collapsed = signal(true);
  readonly conversations = signal<ConversationSummary[]>([]);
  readonly activeConversation = signal<Conversation | null>(null);
  readonly isLoading = signal(false);

  readonly activeConversationId = computed(() => this.activeConversation()?.id ?? null);

  async ngOnInit() {
    this.conversations.set(await this.chatHistoryService.getAllConversations());
  }

  toggleSidebar() {
    this.collapsed.update(value => !value);
  }

  async selectConversation(id: string) {
    const conversation = await this.chatHistoryService.getConversationById(id);
    this.activeConversation.set(conversation);
  }

  newChat() {
    this.activeConversation.set(null);
  }

  logout() {
    // Will navigate to login once auth is implemented
  }

  async sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (!this.activeConversation()) {
      const newConversation: Conversation = {
        id: crypto.randomUUID(),
        title: trimmed.slice(0, 60),
        messages: [],
      };
      this.conversations.update(convs => [{ id: newConversation.id, title: newConversation.title }, ...convs]);
      this.activeConversation.set(newConversation);
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    };
    this.addMessageToActive(userMessage);
    this.isLoading.set(true);

    // START TODO replace this mock code and add error handling
    await new Promise<void>(resolve => setTimeout(resolve, 2000));
    const randomIndex = Math.floor(Math.random() * MOCK_AI_RESPONSES.length);
    // END TODO
    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: MOCK_AI_RESPONSES[randomIndex],
    };
    this.addMessageToActive(aiMessage);
    this.isLoading.set(false);
  }

  private addMessageToActive(message: ChatMessage) {
    this.activeConversation.update(conv =>
      conv ? { ...conv, messages: [...conv.messages, message] } : conv
    );
  }
}
