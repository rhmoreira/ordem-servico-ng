import { ProdutoService } from './../produto/produto.service';
import { CategoriaService } from './../categoria/categoria.service';
import { TabelaPrecoComponent } from './tabela-preco.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabelaPrecoRoutingModule } from './tabela-preco-routing.module';
import { ServicoService } from '../servico/servico.service';
import { TabelaPrecoService } from './tabela-preco.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TabelaPrecoComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabelaPrecoRoutingModule
  ],
  providers: [CategoriaService, ServicoService, ProdutoService, TabelaPrecoService]
})
export class TabelaPrecoModule { }
