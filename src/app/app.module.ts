import { LoginService } from './common/auth/login.service';
import { AuthGuard } from './common/auth/auth.guard';
import { HttpErrorInterceptor } from './common/http-error.interceptor';
import { LoaderInterceptor } from './common/modules/loader/loader-interceptor';
import { LoaderModule } from './common/modules/loader/loader.module';
import { AuthInterceptor } from './common/auth/auth-interceptor';

import { CommonModule, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localePt);

const toastrConfig = {
  closeButton: true,
  positionClass: 'toast-top-right',
  tapToDismiss: true,
  preventDuplicates: true,
};

export function ngbDate2Date(date: NgbDate): Date {
  if (date) {
    return new Date(date.year, date.month - 1, date.day);
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrConfig),
    HttpClientModule,
    LoaderModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    LoginService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
