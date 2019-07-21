import { AuthGuard } from './common/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'layout', pathMatch: 'prefix'},
  {path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)}, // , canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => import('./common/auth/login/login.module').then(l => l.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation : false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
