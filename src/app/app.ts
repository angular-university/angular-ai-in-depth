import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserMessages } from './shared/user-messages/user-messages';
import { GlobalLoading } from './shared/loading-indicator/global-loading';

@Component({
  selector: 'root',
  imports: [RouterOutlet, UserMessages, GlobalLoading],
  templateUrl: './app.html',
})
export class App {}
