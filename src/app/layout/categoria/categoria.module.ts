import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaService } from './categoria.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoriaRoutingModule,
    NgbPaginationModule
  ],
  providers: [CategoriaService]
})
export class CategoriaModule { }
