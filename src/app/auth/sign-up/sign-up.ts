import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { passwordsMatch } from '../passwords-match.validator';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'sign-up',
  imports: [RouterLink, FormField, FormRoot],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private readonly authService = inject(AuthService);

  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly signUpModel = signal({ email: '', password: '', confirmPassword: '' });

  readonly signUpForm = form(this.signUpModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });
    required(fieldPath.password, { message: 'Password is required' });
    minLength(fieldPath.password, 8, { message: 'Password must be at least 8 characters' });
    required(fieldPath.confirmPassword, { message: 'Please confirm your password' });
    passwordsMatch(fieldPath.confirmPassword, fieldPath.password, { message: 'Passwords do not match' });
  }, {
    submission: {
      action: async () => {
        await this.authService.createUser(
          this.signUpForm.email().value(),
          this.signUpForm.password().value(),
        );
      },
    },
  });

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update(visible => !visible);
  }
}
