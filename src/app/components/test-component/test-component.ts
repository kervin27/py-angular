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
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  utenti = signal<Utente[]>([]);

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
      password: this.form.value.password!,
    };

    this.createUtente(newUtente);
  }

  createUtente(newUtente: Utente) {
    this.utentiService.createUtente(newUtente).subscribe((created) => {
      this.getAllUtenti();
      this.form.reset();
    });
  }
}
