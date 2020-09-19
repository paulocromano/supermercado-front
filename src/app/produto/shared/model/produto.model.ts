import { SafeUrl } from '@angular/platform-browser';
import { Setor } from './setor.model';

export class Produto {
    id: number;
    nome: string;
    marca: string;
    dataValidade: string;
    preco: string;
    desconto: number;
    precoComDesconto: string;
    estoque: number;
    estoqueMinimo: number;
    statusProduto: string;
    observacoes: string;
    setor: Setor;
    imagem?: SafeUrl;
}