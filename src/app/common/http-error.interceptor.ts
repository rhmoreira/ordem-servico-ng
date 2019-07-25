import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      share(),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0 || error.error instanceof ErrorEvent) {
      errorMessage = 'Erro de comunicação com o servidor';
    } else {
      errorMessage = error.error.cause;
      error = error.error;
    }

    if (Array.isArray(errorMessage)) {
      errorMessage.forEach(msg => this.toastrService.error(msg, 'Erro'));
    } else {
      this.toastrService.error(errorMessage, 'Erro');
    }
    return throwError(error);
  }
}
