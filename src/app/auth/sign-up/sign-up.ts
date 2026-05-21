import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { passwordsMatch } from '../passwords-match.validator';

@Component({
  selector: 'sign-up',
  imports: [RouterLink, FormField],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
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
  });

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update(visible => !visible);
  }

  submit() {
    if (this.signUpForm().valid()) {
      // Will be wired to the auth service
    }
  }
}
