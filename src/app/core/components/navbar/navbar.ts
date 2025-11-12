import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authService: AuthService = inject(AuthService);

  constructor() {}

  logout() {
    // Implementa la logica di logout
    this.authService.logout();
  }
}
