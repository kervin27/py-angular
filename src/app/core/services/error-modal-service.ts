import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorModalService {
  // Signal che contiene il messaggio della modale
  private _message = signal<string | null>(null);

  // Getter pubblico readonly
  readonly message = this._message;

  // Mostra la modale
  show(message: string) {
    this._message.set(message);
  }

  // Chiudi la modale
  close() {
    this._message.set(null);
  }
}
