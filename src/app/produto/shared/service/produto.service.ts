import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API_CONFIG } from './../../../config/api.config';
import { Produto } from '../model/produto.model';


@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  constructor(private http: HttpClient) { }

  public buscarTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API_CONFIG.baseUrl}/produto/listar-todos`)
      .pipe(
        tap(console.log)
      );
  }
}
