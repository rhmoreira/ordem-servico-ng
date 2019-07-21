import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaService } from './categoria.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoriaRoutingModule
  ],
  providers: [CategoriaService]
})
export class CategoriaModule { }
