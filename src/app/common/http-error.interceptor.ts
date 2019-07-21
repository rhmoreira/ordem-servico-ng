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
      errorMessage = error.error.erro;
      error = error.error;
    }

    this.toastrService.error(errorMessage);
    return throwError(error);
  }
}
