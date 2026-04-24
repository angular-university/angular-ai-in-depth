import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StartConversationResponse, ContinueConversationResponse } from './chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);

  async startConversation(promptId: string, message: string) {
    return await firstValueFrom(
      this.http.post<StartConversationResponse>('/api/start-conversation', { promptId, message })
    );
  }

  async continueConversation(conversationId: string, message: string) {
    return await firstValueFrom(
      this.http.post<ContinueConversationResponse>('/api/continue-conversation', { conversationId, message })
    );
  }
}
