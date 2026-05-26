import { Component, inject } from '@angular/core';
import { UserMessagesService } from './user-messages.service';

@Component({
  selector: 'user-messages',
  templateUrl: './user-messages.html',
  styleUrl: './user-messages.scss',
})
export class UserMessages {
  protected readonly messagesService = inject(UserMessagesService);
}
