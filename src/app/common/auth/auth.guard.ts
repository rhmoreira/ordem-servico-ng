import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): Observable<boolean> {
    const tokenString = localStorage.getItem(environment.authTokenLocalStrKey);

    if (tokenString) {
      const authToken = JSON.parse(tokenString);
      const result = this.loginService.validateToken(authToken.token);

      return new Observable<boolean>(observer => {
        result.then( (ok) => observer.next(true))
              .catch((err) => {
                observer.next(false);
                this.router.navigate(['/login'], { skipLocationChange: true });
              }).finally(() => observer.complete());
      });
    }
    return new Observable<boolean>(observer => {
      observer.next(false);
      observer.complete();
      this.router.navigate(['/login'], { skipLocationChange: true });
    });
  }
}
