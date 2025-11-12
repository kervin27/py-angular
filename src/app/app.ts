import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { ErrorModal } from './core/components/error-modal/error-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ErrorModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ng-habado';
}
