import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ChatMessage } from './chat-message.model';
import { Conversation } from './conversation.model';
import { ConversationSummary } from './conversation-summary.model';
import { ChatHistoryService } from './chat-history.service';
import { ConversationService } from './conversation.service';
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
  private conversationService = inject(ConversationService);

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

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    };

    this.isLoading.set(true);

    try {
      if (!this.activeConversation()) {
        this.activeConversation.set({ id: '', title: trimmed.slice(0, 60), messages: [userMessage] });

        const { conversationId, reply } = await this.conversationService.startConversation(trimmed);

        this.activeConversation.update(conv => conv ? { ...conv, id: conversationId } : conv);
        this.conversations.update(convs => [{ id: conversationId, title: trimmed.slice(0, 60) }, ...convs]);
        this.addMessageToActive({ id: crypto.randomUUID(), role: 'assistant', content: reply });
      } else {
        this.addMessageToActive(userMessage);

        const { reply } = await this.conversationService.continueConversation(this.activeConversation()!.id, trimmed);

        this.addMessageToActive({ id: crypto.randomUUID(), role: 'assistant', content: reply });
      }
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private addMessageToActive(message: ChatMessage) {
    this.activeConversation.update(conv =>
      conv ? { ...conv, messages: [...conv.messages, message] } : conv
    );
  }
}
