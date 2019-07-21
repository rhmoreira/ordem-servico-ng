import { BreadcrumbModule } from '../common/modules/breadcrumb/breadcrumb.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    BreadcrumbModule
  ]
})
export class LayoutModule {
  constructor() {}
}
