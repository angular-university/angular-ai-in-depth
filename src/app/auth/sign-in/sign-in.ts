import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sign-in',
  imports: [RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  readonly email = signal('');
  readonly password = signal('');
  readonly showPassword = signal(false);

  updateEmail(event: Event) {
    this.email.set((event.target as HTMLInputElement).value);
  }

  updatePassword(event: Event) {
    this.password.set((event.target as HTMLInputElement).value);
  }

  togglePassword() {
    this.showPassword.update(visible => !visible);
  }

  submit() {
    // Will be wired to the auth service
  }
}
