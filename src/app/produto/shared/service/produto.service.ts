import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API_CONFIG } from './../../../config/api.config';
import { Produto } from '../model/produto.model';


@Injectable({
  providedIn: 'root'
})

/**
 * Classe de serviço responsável por receber os dados para Listagem de Produtos do Back-End
 */
export class ProdutoService {

  constructor(private http: HttpClient) { }

  /**
   * @description Método responsável por receber uma lista de Produtos do Back-End
   * @returns Observable<Produto[]>
   */
  public buscarTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produto/listar-todos`)
      .pipe(
        tap(console.log)
      );
  }

  public buscarProdutosEmPromocao(): Observable<Produto[]>  {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produto/listar-com-desconto`)
    .pipe(
      tap(console.log)
    );
  }

  /**
   * Método responsável por receber a imagem de um Produto do Back-End
   * @param id : number
   * @returns Observable<any> 
   */
  public buscarImagemProduto(id: number): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/produto/imagem/${id}`, { responseType: 'blob' });
  }
}
