import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private requests = 0;

  constructor(private loaderService: LoaderService) {}

  private completeRequest(): void {
    this.requests -= 1;
    this.loaderService.setVisible(this.requests > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests += 1;

    this.loaderService.setVisible(true);

    return next.handle(request).pipe(
      share(),
      finalize(() => this.completeRequest())
    );
  }
}
