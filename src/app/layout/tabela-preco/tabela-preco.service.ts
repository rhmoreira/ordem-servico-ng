import { TabelaPreco } from './../../common/types/tabela-preco';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';

@Injectable()
export class TabelaPrecoService {

  private tabelaPrecoUri = `${env.appUrl}/TabelaPreco`;

  constructor(private http: HttpClient) { }

  public salvar(tabelPreco: TabelaPreco): Promise<any> {
    return this.http.post(this.tabelaPrecoUri, tabelPreco).pipe(share()).toPromise();
  }

  public pesquisar(nome: string,
                   idCategoria: string,
                   idServico: string,
                   idProduto: string,
                   ativo: string): Promise<TabelaPreco[]> {

    let httpParams = new HttpParams();
    httpParams = nome ? httpParams.append('nome', nome) : httpParams;
    httpParams = idCategoria ? httpParams.append('idCategoria', idCategoria) : httpParams;
    httpParams = idServico ? httpParams.append('idServico', idServico) : httpParams;
    httpParams = idProduto ? httpParams.append('idProduto', idProduto) : httpParams;
    httpParams = ativo ? httpParams.append('ativo', ativo) : httpParams;

    return this.http.get<TabelaPreco[]>(this.tabelaPrecoUri, {params: httpParams}).pipe(share()).toPromise();
  }
}
