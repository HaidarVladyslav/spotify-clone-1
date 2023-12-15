import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../data-access/storage.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.getToken();
  const request = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.error.error.status === 401 && (err.error.error.message === 'Invalid access token') && !router.url.includes('login')) {
        router.navigate(['/auth/login']);
        throw (err);
      }
      throw (err);
    })
  );
};
