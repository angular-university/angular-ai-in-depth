import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { AuthService } from '../../shared/auth/auth.service';
import { GlobalLoadingService } from '../../shared/loading-indicator/global-loading.service';

@Component({
  selector: 'sign-in',
  imports: [RouterLink, FormField, FormRoot],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private readonly authService = inject(AuthService);
  private readonly globalLoading = inject(GlobalLoadingService);

  readonly showPassword = signal(false);

  readonly loginModel = signal({ email: '', password: '' });

  readonly loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });
    required(fieldPath.password, { message: 'Password is required' });
  }, {
    submission: {
      action: async () => {
        this.globalLoading.show();
        try {
          await this.authService.signIn(
            this.loginForm.email().value(),
            this.loginForm.password().value(),
          );
        } finally {
          this.globalLoading.hide();
        }
      },
    },
  });

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }
}
