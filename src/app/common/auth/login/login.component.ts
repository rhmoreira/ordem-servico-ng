import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { slideToBottom } from 'src/app/route-transitions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideToBottom()]
})
export class LoginComponent implements OnInit {

  credentials = {
    login: '',
    senha: ''
  };

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {}

  public doLogin(): void {
    this.loginService
        .login(this.credentials.login, this.credentials.senha)
        .then(authToken => this.router.navigate([''], {skipLocationChange: true}));
  }

}
