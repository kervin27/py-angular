import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { ErrorModal } from './core/components/error-modal/error-modal';
import { Loader } from './core/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ErrorModal, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ng-habado';
}
