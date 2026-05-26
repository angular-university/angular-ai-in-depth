import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'sign-in',
  imports: [RouterLink, FormField],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private readonly authService = inject(AuthService);

  readonly showPassword = signal(false);
  readonly isLoading = signal(false);

  readonly loginModel = signal({ email: '', password: '' });

  readonly loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });
    required(fieldPath.password, { message: 'Password is required' });
  });

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }

  async submit() {
    if (this.loginForm().invalid()) return;
    this.isLoading.set(true);
    try {
      await this.authService.signIn(
        this.loginForm.email().value(),
        this.loginForm.password().value(),
      );
    } finally {
      this.isLoading.set(false);
    }
  }
}
