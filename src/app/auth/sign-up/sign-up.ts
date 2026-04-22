import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, validate } from '@angular/forms/signals';
import { passwordsMatch } from '../../shared/validators/passwords-match.validator';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserProfileService } from '../user-profile.service';
import { LoadingIndicator } from '../../shared/components/loading-indicator/loading-indicator';
import { UserMessageService } from '../../shared/components/user-message/user-message.service';

interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'sign-up',
  imports: [RouterLink, NgOptimizedImage, FormField, LoadingIndicator],
  templateUrl: './sign-up.html',
  styleUrls: ['../auth-shared.scss', './sign-up.scss'],
})
export class SignUp {
  private readonly authService = inject(AuthService);
  private readonly userProfile = inject(UserProfileService);
  private readonly router = inject(Router);
  private readonly userMessage = inject(UserMessageService);

  protected readonly model = signal<SignUpData>({ email: '', password: '', confirmPassword: '' });
  protected readonly loading = signal(false);

  protected readonly form = form(this.model, (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Enter a valid email address' });
    required(p.password, { message: 'Password is required' });
    required(p.confirmPassword, { message: 'Please confirm your password.' });
    validate(p.confirmPassword, passwordsMatch(p.password));
  });

  protected async onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);
    this.userMessage.clear();

    try {
      const response = await this.authService.signUp(this.model().email, this.model().password);
      this.userProfile.saveSession(response.token, response.user);
      this.router.navigate(['/home']);
    } catch (err: unknown) {
      const httpErr = err as HttpErrorResponse;
      this.userMessage.show(httpErr.error?.message ?? 'Something went wrong. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
