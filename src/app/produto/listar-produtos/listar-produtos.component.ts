import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { ProdutoService } from './../shared/service/produto.service';
import { Produto } from '../shared/model/produto.model';


@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  public produtos: Produto[];
  public sortOptions: SelectItem[];
  public sortOrder: number;
  public sortField: string;

  constructor(
    private produtoService: ProdutoService,
    private primengConfig: PrimeNGConfig,
    private sanitizer : DomSanitizer
    ) { }


  ngOnInit(): void {
    this.listarProdutos();
    this.ordenacaoDataView();

    this.primengConfig.ripple = true;
  }


  private listarProdutos(): void {
    this.produtoService.buscarTodosProdutos()
      .subscribe((produto: Produto[]) => {
        this.produtos = produto;  
        this.carregarImagem();
      },

        (errorBackEnd: HttpErrorResponse) => {
          console.log(errorBackEnd)
        }
      );      
  }

  public carregarImagem() {
   
    for (let i = 0; i < this.produtos.length; i++) {
      const idProduto = this.produtos[i].id;
      
      this.produtoService.buscarImagemProduto(idProduto)
      .subscribe((imagem: any) => {
        console.log(imagem);

        let blob = new Blob([imagem]);
        this.produtos[i].imagem = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
      }),
        (error) => {};
    }; 
  }

  private ordenacaoDataView() {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
