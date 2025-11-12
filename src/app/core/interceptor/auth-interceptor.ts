import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorModalService } from '../services/error-modal-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { pathRoute } from '../../app.routes';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Recupera il token dal localStorage (o da un servizio AuthService)
  const token = localStorage.getItem('authToken');
  const router: Router = inject(Router);
  const modalService: ErrorModalService = inject(ErrorModalService);
  // Se c'è il token, clona la richiesta e aggiungi l'header Authorization
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: any) => {
      // Gestione globale degli errori
      if (error.status === 401) {
        // Token non valido o scaduto → logout o redirect login

        modalService.show(
          error.error?.error || 'Session expired. Please log in again.'
        );
        localStorage.removeItem('authToken');
        // Se usi Router, puoi fare il redirect:
        // router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigate([pathRoute.notAuthenticated]);
      } else {
        console.error('Errore HTTP:', error);
        modalService.show(
          error.error?.error ||
            'An unexpected error occurred. Please try again later.'
        );
      }

      return throwError(() => error); // Propaga l'errore al componente
    })
  );
};
