import { Component, computed, signal } from '@angular/core';
import { ChatMessage } from './chat-message.model';
import { Conversation } from './conversation.model';
import { MOCK_AI_RESPONSES, MOCK_CONVERSATIONS } from './mock-data';
import { SideNav } from './side-nav/side-nav';
import { InitialState } from './initial-state/initial-state';
import { ConversationThread } from './conversation-thread/conversation-thread';

@Component({
  selector: 'home',
  imports: [SideNav, InitialState, ConversationThread],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly collapsed = signal(true);
  readonly activeConversationId = signal<string | null>(null);
  readonly conversations = signal<Conversation[]>(MOCK_CONVERSATIONS);
  readonly isLoading = signal(false);

  readonly activeConversation = computed(() =>
    this.conversations().find(conv => conv.id === this.activeConversationId()) ?? null
  );

  toggleSidebar() {
    this.collapsed.update(value => !value);
  }

  selectConversation(id: string) {
    this.activeConversationId.set(id);
  }

  newChat() {
    this.activeConversationId.set(null);
  }

  logout() {
    // Will navigate to login once auth is implemented
  }

  async sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (!this.activeConversationId()) {
      const newConversation: Conversation = {
        id: crypto.randomUUID(),
        title: trimmed.slice(0, 60),
        messages: [],
      };
      this.conversations.update(convs => [newConversation, ...convs]);
      this.activeConversationId.set(newConversation.id);
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
    const activeId = this.activeConversationId();
    this.conversations.update(convs =>
      convs.map(conv =>
        conv.id === activeId ? { ...conv, messages: [...conv.messages, message] } : conv
      )
    );
  }
}
