import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { ErrorModalService } from '../services/error-modal-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { pathRoute } from '../../app.routes';
import { isLoading } from '../states/loading.signal';

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

  isLoading.set(true);

  return next(authReq).pipe(
    finalize(() => isLoading.set(false)),
    catchError((error: any) => {
      // Gestione globale degli errori
      if (error.status === 401) {
        modalService.show(
          error.error?.error || 'Session expired. Please log in again.'
        );
        localStorage.removeItem('authToken');
      } else if (error.status === 403) {
        router.navigate([pathRoute.notAuthenticated]);
      } else {
        modalService.show(
          error.error?.error ||
            'An unexpected error occurred. Please try again later.'
        );
      }
      isLoading.set(false);
      return throwError(() => error); // Propaga l'errore al componente
    })
  );
};
