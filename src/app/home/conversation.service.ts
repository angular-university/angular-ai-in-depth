import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StartConversationResponse } from './start-conversation-response.model';
import { ContinueConversationResponse } from './continue-conversation-response.model';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private http = inject(HttpClient);

  async startConversation(message: string) {
    return firstValueFrom(
      this.http.post<StartConversationResponse>('/api/start-conversation', {
        promptId: 'angular-assistant',
        message,
      })
    );
  }

  async continueConversation(conversationId: string, message: string) {
    return firstValueFrom(
      this.http.post<ContinueConversationResponse>('/api/continue-conversation', {
        conversationId,
        message,
      })
    );
  }
}
