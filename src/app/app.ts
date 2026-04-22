import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLoadingIndicator } from './shared/components/router-loading-indicator/router-loading-indicator';
import { UserMessage } from './shared/components/user-message/user-message';
import { UserMessageService } from './shared/components/user-message/user-message.service';

@Component({
  selector: 'root',
  imports: [RouterOutlet, RouterLoadingIndicator, UserMessage],
  templateUrl: './app.html'
})
export class App {
  protected readonly userMessageService = inject(UserMessageService);
}
