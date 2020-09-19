import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarProdutosComponent } from './produto/listar-produtos/listar-produtos.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: ListarProdutosComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
