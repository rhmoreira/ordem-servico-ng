import { TabelaPrecoComponent } from './tabela-preco.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: TabelaPrecoComponent, data: {breadcrumbIgnore: true}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabelaPrecoRoutingModule { }
