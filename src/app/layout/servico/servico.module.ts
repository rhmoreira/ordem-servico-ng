import { CategoriaService } from './../categoria/categoria.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoComponent } from './servico.component';
import { ServicoService } from './servico.service';


@NgModule({
  declarations: [ServicoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ServicoRoutingModule
  ],
  providers: [ServicoService, CategoriaService]
})
export class ServicoModule { }
