import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { pathRoute } from '../../../app.routes';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
})
export class Login {
  form = new FormGroup({
    username: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.form.valid) {
      this.authService
        .login(this.form.value.username!, this.form.value.password!)
        .subscribe({
          next: (response) => {
            this.router.navigate([pathRoute.home]);
          },
          error: (error) => {
            return throwError(() => error);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
