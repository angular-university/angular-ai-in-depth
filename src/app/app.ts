import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoadingIndicator } from './shared/components/global-loading-indicator/global-loading-indicator';
import { UserMessage } from './shared/components/user-message/user-message';
import { UserMessageService } from './shared/components/user-message/user-message.service';

@Component({
  selector: 'root',
  imports: [RouterOutlet, GlobalLoadingIndicator, UserMessage],
  templateUrl: './app.html'
})
export class App {
  protected readonly userMessageService = inject(UserMessageService);
}
