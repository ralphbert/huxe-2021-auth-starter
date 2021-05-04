import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = this.authService.getAuthToken();
    let theRequest = request;

    if (jwt) {
      theRequest = theRequest.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwt}`)
      });
    }

    return next.handle(theRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // if the session timed out, redirect to the login
          this.authService.logout();
          this.router.navigate(['/login']);
          console.warn('JWT session timed out. Your token was invalid.');
          return EMPTY;
        }

        return throwError(error);
      }),
    );
  }
}
