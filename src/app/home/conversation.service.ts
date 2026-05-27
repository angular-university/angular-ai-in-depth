import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StartConversationResponse } from './start-conversation-response.model';
import { ContinueConversationResponse } from './continue-conversation-response.model';
import { SKIP_LOADING } from '../shared/loading-indicator/http-loading.interceptor';

const skipLoading = { context: new HttpContext().set(SKIP_LOADING, true) };

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private http = inject(HttpClient);

  async startConversation(message: string) {
    return firstValueFrom(
      this.http.post<StartConversationResponse>(
        '/api/start-conversation',
        { promptId: 'angular-assistant', message },
        skipLoading,
      )
    );
  }

  async continueConversation(conversationId: string, message: string) {
    return firstValueFrom(
      this.http.post<ContinueConversationResponse>(
        '/api/continue-conversation',
        { conversationId, message },
        skipLoading,
      )
    );
  }
}
