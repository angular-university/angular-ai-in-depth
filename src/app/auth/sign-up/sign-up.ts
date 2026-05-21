import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  updateEmail(event: Event) {
    this.email.set((event.target as HTMLInputElement).value);
  }

  updatePassword(event: Event) {
    this.password.set((event.target as HTMLInputElement).value);
  }

  updateConfirmPassword(event: Event) {
    this.confirmPassword.set((event.target as HTMLInputElement).value);
  }

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update(visible => !visible);
  }

  submit() {
    // Will be wired to the auth service
  }
}
