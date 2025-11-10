import { HttpInterceptorFn } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap((event: any) => {
      if (event?.body && event.status >= 200 && event.status < 300) {
        if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
          const message = event.body.message || '✅ Operation successful';
          snackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      }
    }),
    catchError((err: any) => {
      let message = 'Something went wrong ❌';

      if (err?.error) {
        const errorBody = err.error;

        if (errorBody.title || errorBody.detail) {
          message = `${errorBody.title || ''} ${errorBody.detail || ''}`.trim();
        } else if (errorBody.message) {
          message = errorBody.message;
        } else if (errorBody.statusCode && errorBody.message) {
          message = errorBody.message;
        }
      }

      snackBar.open(message, 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
      });

      return throwError(() => err);
    })
  );
};
