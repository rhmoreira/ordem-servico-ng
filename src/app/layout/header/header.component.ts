import { environment } from './../../../environments/environment';
import { LoginService } from './../../common/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  public async doLogout() {
    await this.loginService.logout()
        .then((r) => this.router.navigate(['login'], {skipLocationChange: true}));
  }
}
