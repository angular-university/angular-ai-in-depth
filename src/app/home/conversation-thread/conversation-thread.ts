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

  private shouldScrollToBottom = false;

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
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
    this.shouldScrollToBottom = true;
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
