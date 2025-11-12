import { Component, signal } from '@angular/core';
import { Utenti } from '../../services/utenti';
import { Utente } from '../../models/utenti.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-test-component',
  imports: [ReactiveFormsModule],
  templateUrl: './test-component.html',
  styleUrl: './test-component.scss',
  standalone: true,
})
export class TestComponent {
  form = new FormGroup({
    username: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  utenti = signal<Utente[]>([]);
  isModifica = signal(false);
  utenteSelected = signal<Utente | null>(null);

  constructor(private utentiService: Utenti) {}

  ngOnInit() {
    this.getAllUtenti();
  }

  getAllUtenti() {
    this.utentiService.getUtenti().subscribe((data) => {
      this.utenti.set(data);
    });
  }

  submit() {
    const newUtente: Utente = {
      username: this.form.value.username!,
      email: this.form.value.email!,
    };

    if (this.isModifica()) {
      // Logica di modifica utente (non implementata in questo esempio)
      this.isModifica.set(false);
      this.form.reset();

      return;
    } else {
      this.createUtente(newUtente);
    }
  }

  createUtente(newUtente: Utente) {
    this.utentiService.createUtente(newUtente).subscribe((created) => {
      this.getAllUtenti();
      this.form.reset();
    });
  }

  putModificaUtente() {
    this.utentiService
      .updateUtente(this.utenteSelected()!.id, this.form.value as Utente)
      .subscribe(() => {
        this.getAllUtenti();
        this.form.reset();
      });
  }

  modificaUtente(utente: Utente) {
    this.isModifica.set(true);
    this.form.patchValue({
      username: utente.username,
      email: utente.email,
    });
    this.utenteSelected.set(utente);
  }

  eliminaUtente(utente: Utente) {
    this.utentiService.deleteUtente(utente.id).subscribe(() => {
      this.getAllUtenti();
    });
  }
}
