import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoComponent } from './servico.component';


@NgModule({
  declarations: [ServicoComponent],
  imports: [
    CommonModule,
    ServicoRoutingModule
  ]
})
export class ServicoModule { }
