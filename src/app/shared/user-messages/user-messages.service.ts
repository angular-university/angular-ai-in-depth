import { Injectable, signal } from '@angular/core';
import { MessageType, UserMessage } from './user-message.model';

@Injectable({ providedIn: 'root' })
export class UserMessagesService {
  readonly messages = signal<UserMessage[]>([]);

  error(text: string) {
    this.add('error', text);
  }

  warning(text: string) {
    this.add('warning', text);
  }

  info(text: string) {
    this.add('info', text);
  }

  success(text: string) {
    this.add('success', text);
  }

  dismiss(id: string) {
    this.messages.update(msgs => msgs.filter(message => message.id !== id));
  }

  clearAll() {
    this.messages.set([]);
  }

  private add(type: MessageType, text: string) {
    const message: UserMessage = { id: crypto.randomUUID(), type, text };
    this.messages.update(msgs => [...msgs, message]);
  }
}
