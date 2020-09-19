import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoDashboardComponent } from './cabecalho-dashboard/cabecalho-dashboard.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    CabecalhoDashboardComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [    
    CabecalhoDashboardComponent
  ]
})

export class DashboardModule { }
