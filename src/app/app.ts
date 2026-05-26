import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserMessages } from './shared/user-messages/user-messages';

@Component({
  selector: 'root',
  imports: [RouterOutlet, UserMessages],
  templateUrl: './app.html',
})
export class App {}
