import { AfterViewChecked, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { Conversation } from '../conversation.model';

@Component({
  selector: 'conversation-thread',
  templateUrl: './conversation-thread.html',
  styleUrl: './conversation-thread.scss',
})
export class ConversationThread implements AfterViewChecked {
  readonly conversation = input.required<Conversation>();
  readonly isLoading = input.required<boolean>();

  readonly messageSent = output<string>();
  readonly messageText = signal('');

  readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  private lastMessageCount = 0;
  private wasLoading = false;

  ngAfterViewChecked() {
    const messageCount = this.conversation().messages.length;
    const loading = this.isLoading();

    if (messageCount !== this.lastMessageCount || loading !== this.wasLoading) {
      this.lastMessageCount = messageCount;
      this.wasLoading = loading;
      this.scrollToBottom();
    }
  }

  updateMessage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.messageText.set(inputElement.value);
  }

  submit() {
    const text = this.messageText().trim();
    if (!text) return;
    this.messageSent.emit(text);
    this.messageText.set('');
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  private scrollToBottom() {
    const container = this.messagesContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
