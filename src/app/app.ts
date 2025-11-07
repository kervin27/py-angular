import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'py-angular';

  userData = signal([] as any[]);

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  getUserData() {
    this.http
      .get('https://python-backend-production-07d8.up.railway.app/utenti')
      .subscribe((data: any) => {
        this.userData.set(data);
      });
  }

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http
      .post(
        'https://python-backend-production-07d8.up.railway.app/utenti',
        user
      )
      .subscribe((response) => {
        this.getUserData();
      });
  }
}
