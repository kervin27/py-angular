import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/config-dev';
import { map, Observable } from 'rxjs';
import { Utente } from '../models/utenti.interface';

@Injectable({
  providedIn: 'root',
})
export class Utenti {
  private baseUrl = API_CONFIG.baseUrl;
  private endpoint = '/utenti';
  constructor(private http: HttpClient) {}

  getUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(`${this.baseUrl}${this.endpoint}`);
  }

  createUtente(utente: Utente): Observable<Utente> {
    return this.http.post<Utente>(`${this.baseUrl}${this.endpoint}`, utente);
  }

  updateUtente(id: number, utente: Utente): Observable<Utente> {
    return this.http.put<Utente>(
      `${this.baseUrl}${this.endpoint}/${id}`,
      utente
    );
  }

  deleteUtente(id: number) {
    return this.http.delete(`${this.baseUrl}${this.endpoint}/${id}`);
  }
}
