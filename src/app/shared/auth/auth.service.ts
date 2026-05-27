import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserMessagesService } from '../user-messages/user-messages.service';
import { SignInResponse } from './sign-in-response.model';
import { PROFILE_STORAGE_KEY, TOKEN_STORAGE_KEY } from './auth-storage-keys';

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
      this.storeSession(response);
      await this.router.navigateByUrl('/home');
    } catch (error: unknown) {
      this.userMessagesService.error(extractErrorMessage(error, 'Sign in failed. Please try again.'));
    }
  }

  async createUser(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.post<SignInResponse>('/api/sign-up', { email, password }),
      );
      this.storeSession(response);
      await this.router.navigateByUrl('/home');
    } catch (error: unknown) {
      this.userMessagesService.error(extractErrorMessage(error, 'Account creation failed. Please try again.'));
    }
  }

  async logout() {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    await this.router.navigateByUrl('/sign-in');
  }

  private storeSession(response: SignInResponse) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(response.user));
    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
  }
}

function extractErrorMessage(error: unknown, fallback: string): string {
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
  return fallback;
}
