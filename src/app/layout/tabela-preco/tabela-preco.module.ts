import { ProdutoService } from './../produto/produto.service';
import { CategoriaService } from './../categoria/categoria.service';
import { TabelaPrecoComponent } from './tabela-preco.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

import { TabelaPrecoRoutingModule } from './tabela-preco-routing.module';
import { ServicoService } from '../servico/servico.service';
import { TabelaPrecoService } from './tabela-preco.service';
import { FormsModule } from '@angular/forms';

export const maskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [TabelaPrecoComponent],
  imports: [
    CommonModule,
    FormsModule,
    TabelaPrecoRoutingModule,
    CurrencyMaskModule
  ],
  providers: [
    CategoriaService, ServicoService, ProdutoService, TabelaPrecoService,
    { provide: CURRENCY_MASK_CONFIG, useValue: maskConfig }
  ]
})
export class TabelaPrecoModule { }
