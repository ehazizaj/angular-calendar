import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, retry, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /* Error for login page will be handled in the component */
    if (request.url.includes('login')) {
      return next.handle(request);
    }

    /* Error if client is offline */
    if (!window.navigator.onLine) {
      this.toast.error('', 'There is no internet connection!');
      return throwError(new HttpErrorResponse({error: 'Internet connection is required.'}));
    } else {
      return next.handle(request).pipe(
        // checks if response object has error key
        tap(evt => {
          if (evt instanceof HttpResponse && evt?.body?.error) {
            this.toast.error('', evt.body.error);
            console.error('🚨 ' + evt.body.error);
          }
        }),
        // retry the api 2 times before return error
        retry(2),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.toast.error('', error.error.message);
          } else {
            // server-side error
            switch (error.status) {
              case 0:
                this.toast.error('', 'Server is not responding!');
                break;
              case 403:
                this.toast.error('Token expired!', 'Error');
                this.auth.logout();
                break;
              default:
                this.toast.error(error.message, `Error Code: ${error.status}`);
                break;
            }
          }
          return throwError(new HttpErrorResponse({error}));
        }),
      );
    }
  }
}

export const HTTP_ERROR_INTERCEPTOR = {
  useClass: ErrorInterceptor,
  provide: HTTP_INTERCEPTORS,
  multi: true
};
