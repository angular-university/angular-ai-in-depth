import { Injectable, signal } from '@angular/core';
import { UserProfile } from './user-profile.model';
import { PROFILE_STORAGE_KEY, TOKEN_STORAGE_KEY } from './auth-storage-keys';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  readonly profile = signal<UserProfile | null>(this.loadProfile());

  clearProfile() {
    this.profile.set(null);
  }

  private loadProfile(): UserProfile | null {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as UserProfile;
    } catch {
      return null;
    }
  }
}
