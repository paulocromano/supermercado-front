import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { ProdutoService } from './../shared/service/produto.service';
import { Produto } from '../shared/model/produto.model';
import { StatusProduto } from './../shared/model/statusProduto.enum';


@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})

/**
 * @description Classe responsável pela Listagem de Produtos
 */
export class ListarProdutosComponent implements OnInit {

  public produtos: Produto[];
  public sortOptions: SelectItem[];
  public sortOrder: number;
  public sortField: string;
  public sortKey: string;
  public loading: boolean;

  public statusProduto = StatusProduto;
  public produtosEmPromocao: Produto[];

  public mostrarDialogInformacoesproduto = false;
  public produtoDialog: Produto;


  constructor(
    private produtoService: ProdutoService,
    private primengConfig: PrimeNGConfig,
    private sanitizer : DomSanitizer
    ) { }


  ngOnInit(): void {
    this.listarProdutos();
    this.listarProdutosEmPromocao();
    this.ordenacaoDataView();

    this.primengConfig.ripple = true;
    this.produtoDialog = new Produto();
  }


  /**
   * @description Método responsável por listar os Produtos
   */
  private listarProdutos(): void {
    this.loading = true;

    this.produtoService.buscarTodosProdutos()
      .subscribe((produto: Produto[]) => {
        this.produtos = produto;  
        this.carregarImagem(this.produtos);
        this.loading = false;
      },

        (errorBackEnd: HttpErrorResponse) => {
          console.log(errorBackEnd)
          this.loading = false;
        }
      );      
  }

  /**
   * @description Método responsável por listar os Produtos em Promoção
   */
  private listarProdutosEmPromocao(): void {
    this.loading = true;

    this.produtoService.buscarProdutosEmPromocao()
      .subscribe((produto: Produto[]) => {
        this.produtosEmPromocao = produto;
        this.carregarImagem(this.produtosEmPromocao);
        this.loading = false;
      },

        (errorBackEnd: HttpErrorResponse) => {
        console.log(errorBackEnd)
        this.loading = false;
        }
      );
  }

  /**
   * @description Método responsável por carregar a imagem de cada Produto
   * @param produtos : Produto[]
   */
  public carregarImagem(produtos: Produto[]): void {
   
    for (let i = 0; i < produtos.length; i++) {
      const idProduto = produtos[i].id;
      
      this.produtoService.buscarImagemProduto(idProduto)
      .subscribe((imagem: any) => {
        let blob = new Blob([imagem]);
        produtos[i].imagem = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
      }),
        (error) => {};
    }; 
  }

  /**
   * @description Método responsável pelas opções de ordenação dos Produtos no DataView
   */
  private ordenacaoDataView() {
    this.sortOptions = [
      { label: 'Nome', value: 'nome' },
      { label: 'Preço (decrescente)', value: '!preco' },
      { label: 'Preço (crescente)', value: 'preco' }
    ];
  }

  /**
   * Método responsável por escutar as mudanças do DropDown de ordenação de Produtos
   * @param event : any
   */
  onSortChange(event: any): void {
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

  /**
   * Método responsável por receber as informações do Produto selecionado e abrir o Dialog para mais informações
   * @param produto : Produto
   */
  public dialogInformacoesProduto(produto: Produto): void {
    this.mostrarDialogInformacoesproduto = true;
    this.produtoDialog = produto;
  }
}
