import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { pathRoute } from '../../../app.routes';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: true,
})
export class Register {
  authService: AuthService = inject(AuthService);
  route: Router = inject(Router);

  form = new FormGroup(
    {
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
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    },
    { validators: this.passwordMatchValidator }
  );

  constructor() {}

  passwordMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  submit() {
    if (this.form.valid) {
      this.authService
        .register(
          this.form.value.username!,
          this.form.value.email!,
          this.form.value.password!
        )
        .subscribe({
          next: (response) => {
            alert(
              'La registrazione è avvenuta con successo! Effettua il login.'
            );
            this.route.navigate([pathRoute.login]);
          },
          error: (error) => {
            console.error('Registration error:', error);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
