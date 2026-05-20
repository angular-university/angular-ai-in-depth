import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ConversationSummary } from './conversation-summary.model';
import { Conversation } from './conversation.model';

@Injectable({ providedIn: 'root' })
export class ChatHistoryService {
  private http = inject(HttpClient);

  async getAllConversations() {
    return firstValueFrom(this.http.get<ConversationSummary[]>('/api/get-chat-history'));
  }

  async getConversationById(id: string) {
    return firstValueFrom(this.http.get<Conversation>(`/api/get-chat-conversation/${id}`));
  }
}
