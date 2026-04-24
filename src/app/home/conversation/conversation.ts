import { Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Conversation } from '../chat.model';

@Component({
  selector: 'chat-conversation',
  templateUrl: './conversation.html',
  styleUrl: './conversation.scss',
  imports: [NgOptimizedImage],
})
export class ChatConversation {
  conversation = input.required<Conversation>();
  isLoading = input(false);
  messageSent = output<string>();

  inputValue = signal('');

  onInputChange(event: Event) {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  send() {
    const content = this.inputValue().trim();
    if (!content || this.isLoading()) return;
    this.messageSent.emit(content);
    this.inputValue.set('');
  }
}
