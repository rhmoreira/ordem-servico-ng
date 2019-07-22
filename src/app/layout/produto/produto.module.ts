import { CategoriaService } from './../categoria/categoria.service';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from './produto.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';


@NgModule({
  declarations: [ProdutoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProdutoRoutingModule
  ],
  providers: [ProdutoService, CategoriaService]
})
export class ProdutoModule { }
