import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'sign-in',
  imports: [RouterLink, FormField],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  readonly showPassword = signal(false);

  readonly loginModel = signal({ email: '', password: '' });

  readonly loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Enter a valid email address' });
    required(fieldPath.password, { message: 'Password is required' });
  });

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }

  submit() {
    if (this.loginForm().valid()) {
      // Will be wired to the auth service
    }
  }
}
