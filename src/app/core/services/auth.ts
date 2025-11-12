import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthUserLogin, AuthMessage } from '../model/auth.user.interface';
import { API_CONFIG } from '../../../config/config-dev';
import { Router } from '@angular/router';
import { pathRoute } from '../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  route = inject(Router);

  constructor(private http: HttpClient) {}

  private baseUrl = API_CONFIG.baseUrl;

  isAuthenticated(): boolean {
    // Implementa la logica per verificare se l'utente è autenticato
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    // Implementa la logica per il logout dell'utente
    localStorage.removeItem('authToken');
    this.route.navigate([pathRoute.login]);
  }

  login(username: string, password: string): Observable<AuthUserLogin> {
    // Implementa la logica per il login dell'utente
    return this.http
      .post<AuthUserLogin>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((response: AuthUserLogin) => {
          this.setToken(response.access_token);
        })
      );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthMessage> {
    // Implementa la logica per la registrazione dell'utente
    return this.http.post<AuthMessage>(`${this.baseUrl}/auth/register`, {
      username,
      email,
      password,
    });
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
