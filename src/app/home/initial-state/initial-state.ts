import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'initial-state',
  templateUrl: './initial-state.html',
  styleUrl: './initial-state.scss',
})
export class InitialState {
  readonly messageSent = output<string>();
  readonly messageText = signal('');

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
}
