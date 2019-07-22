import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, data: {breadcrumbIgnore: true},
      children: [{
        path: 'Categoria', loadChildren: () => import('./categoria/categoria.module').then(c => c.CategoriaModule),
        data: {breadcrumb: 'Categorias', icon: 'fa fa-folder-open-o'}
      }, {
        path: 'Servico', loadChildren: () => import('./servico/servico.module').then(s => s.ServicoModule),
        data: {breadcrumb: 'Serviços', icon: 'fa fa-wrench'}
      }, {
        path: 'Produto', loadChildren: () => import('./produto/produto.module').then(p => p.ProdutoModule),
        data: {breadcrumb: 'Produtos', icon: 'fa fa-list'}
      }]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
