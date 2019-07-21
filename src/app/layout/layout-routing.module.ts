import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, data: {breadcrumbIgnore: true},
      children: [{
        path: 'Categoria', loadChildren: () => import('./categoria/categoria.module').then(c => c.CategoriaModule)
      }]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
