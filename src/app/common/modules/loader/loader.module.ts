import { LoaderService } from './loader.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './component/loader.component';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [LoaderService],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
