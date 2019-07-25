import { TabelaPreco } from './../../common/types/tabela-preco';
import { HttpClient } from '@angular/common/http';
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
}
