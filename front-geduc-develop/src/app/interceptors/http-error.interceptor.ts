import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((erro: HttpErrorResponse) => {
        let errorMsg = '';

        if(erro.error.message !== undefined){
          if(erro.status < 500) {
            errorMsg = `${erro.error.message}`;
          } else {
            errorMsg = 'Aconteceu um erro. Tente novamente!'
          }
        } else {
          errorMsg = 'Aconteceu um erro. Tente novamente!'
        }
        
        this.snackBar.open(errorMsg, 'X', {
          panelClass: ['red-snackbar']
        });
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
