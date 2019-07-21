import { Injectable, SkipSelf } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isSkip(request)) {
      const authUser = JSON.parse(localStorage.getItem('auth-token'));

      if (authUser) {
        request = request.clone({
          setHeaders: {Authorization: `Basic ${authUser.token}`}
        });
      }
    }

    return next.handle(request);
  }

  private isSkip(request: HttpRequest<any>): boolean {
    return env.hideProgressUrls.includes(request.url);
  }
}
