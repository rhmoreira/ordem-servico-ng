import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUri = `${environment.authUrl}/auth/login`;
  private invalidateUri = `${environment.authUrl}/auth/token/invalidate`;
  private validateTokenUri = `${environment.authUrl}/auth/token/validate`;

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  public validateToken(authToken: string): Promise<any> {
    const result = this.http.put(this.validateTokenUri, {token: authToken});
    return result.toPromise();
  }

  public login(userLogin: string, userSenha: string): Promise<any> {
    const result = this.http.post(this.loginUri, {login: userLogin, senha: userSenha}).pipe(share());
    result.subscribe(authToken => localStorage.setItem(environment.authTokenLocalStrKey, JSON.stringify(authToken)));
    return result.toPromise();
  }

  public logout(): Promise<any> {
    const authTokenString = localStorage.getItem(environment.authTokenLocalStrKey);
    if (authTokenString) {
      localStorage.removeItem(environment.authTokenLocalStrKey);

      const authToken = JSON.parse(authTokenString);
      return this.http.put(this.invalidateUri, {token: authToken.token}).pipe(share()).toPromise();
    } else {
      return new Observable(observer => observer.complete()).toPromise();
    }
  }
}
