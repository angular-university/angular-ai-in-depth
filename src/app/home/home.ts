import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatSidebar } from './sidebar/sidebar';
import { WelcomeScreen } from './welcome-screen/welcome-screen';
import { ChatConversation } from './conversation/conversation';
import { ChatMessage, Conversation } from './chat.model';
import { ConversationSummary } from './chat-history.model';
import { ChatHistoryService } from './chat-history.service';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [ChatSidebar, WelcomeScreen, ChatConversation],
})
export class Home implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly chatHistoryService = inject(ChatHistoryService);
  private readonly chatService = inject(ChatService);

  sidebarCollapsed = signal(true);
  conversationSummaries = signal<ConversationSummary[]>([]);
  activeConversation = signal<Conversation | null>(null);
  isLoading = signal(false);

  async ngOnInit() {
    try {
      const summaries = await this.chatHistoryService.getAllConversations();
      this.conversationSummaries.set(summaries);
    } catch {
      // Leave sidebar empty on error
    }
  }

  onCollapseToggled() {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  onNewChat() {
    this.activeConversation.set(null);
  }

  async onConversationSelected(convId: string) {
    try {
      const conversation = await this.chatHistoryService.getConversationById(convId);
      this.activeConversation.set(conversation);
    } catch {
      // Keep current view on error
    }
  }

  async onLogout() {
    await this.authService.logout();
  }

  async onMessageSent(content: string) {
    if (this.isLoading()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const current = this.activeConversation();

    if (current) {
      this.activeConversation.set({ ...current, messages: [...current.messages, userMessage] });
      this.isLoading.set(true);
      try {
        const response = await this.chatService.continueConversation(current.id, content);
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
        };
        this.activeConversation.update(conv =>
          conv ? { ...conv, messages: [...conv.messages, assistantMessage] } : null
        );
      } catch {
        // User message remains visible; user can retry
      } finally {
        this.isLoading.set(false);
      }
    } else {
      const tempId = crypto.randomUUID();
      const tempConversation: Conversation = {
        id: tempId,
        title: content.length > 60 ? content.slice(0, 60) : content,
        createdAt: new Date(),
        messages: [userMessage],
      };
      this.activeConversation.set(tempConversation);
      this.isLoading.set(true);
      try {
        const response = await this.chatService.startConversation('angular-assistant', content);
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
        };
        const newConversation: Conversation = {
          ...tempConversation,
          id: response.conversationId,
          messages: [...tempConversation.messages, assistantMessage],
        };
        const summary: ConversationSummary = {
          id: newConversation.id,
          title: newConversation.title,
          createdAt: newConversation.createdAt,
        };
        this.conversationSummaries.update(summaries => [summary, ...summaries]);
        this.activeConversation.set(newConversation);
        this.sidebarCollapsed.set(false);
      } catch {
        this.activeConversation.set(null);
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
