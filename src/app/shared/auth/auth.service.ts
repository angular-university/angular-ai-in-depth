import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserMessagesService } from '../user-messages/user-messages.service';
import { SignInResponse } from './sign-in-response.model';
import { PROFILE_STORAGE_KEY, TOKEN_STORAGE_KEY } from './auth-storage-keys';
import {UserProfile} from './user-profile.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userMessagesService = inject(UserMessagesService);

  async signIn(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.post<SignInResponse>('/api/sign-in', { email, password }),
      );
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(response.user));
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      await this.router.navigateByUrl('/home');
    } catch (error: unknown) {
      const message = extractErrorMessage(error);
      this.userMessagesService.error(message);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}

function extractErrorMessage(error: unknown): string {
  if (
    error !== null &&
    typeof error === 'object' &&
    'error' in error &&
    error.error !== null &&
    typeof error.error === 'object' &&
    'error' in error.error &&
    typeof error.error.error === 'string'
  ) {
    return error.error.error;
  }
  return 'Sign in failed. Please try again.';
}
