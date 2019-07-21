import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
