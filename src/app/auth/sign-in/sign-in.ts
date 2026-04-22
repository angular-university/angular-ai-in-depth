import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LoadingIndicator } from '../../shared/components/loading-indicator/loading-indicator';
import { UserMessageService } from '../../shared/components/user-message/user-message.service';

interface SignInData {
  email: string;
  password: string;
}

@Component({
  selector: 'sign-in',
  imports: [RouterLink, NgOptimizedImage, FormField, LoadingIndicator],
  templateUrl: './sign-in.html',
  styleUrls: ['../auth-shared.scss', './sign-in.scss'],
})
export class SignIn {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly userMessage = inject(UserMessageService);

  protected readonly model = signal<SignInData>({ email: '', password: '' });
  protected readonly loading = signal(false);

  protected readonly form = form(this.model, (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Enter a valid email address' });
    required(p.password, { message: 'Password is required' });
  });

  protected async onSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);
    this.userMessage.clear();

    try {
      await this.authService.signIn(this.model().email, this.model().password);
      this.router.navigate(['/home']);
    } catch (err: unknown) {
      const httpErr = err as HttpErrorResponse;
      this.userMessage.show(httpErr.error?.message ?? 'Something went wrong. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
