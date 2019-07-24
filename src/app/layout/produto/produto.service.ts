import { Produto } from './../../common/types/produto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable()
export class ProdutoService {

  private produtoUri = `${environment.appUrl}/Produto`;
  private produtoPorCategoriaUri = `${environment.appUrl}/Produto/Categoria`;

  constructor(private http: HttpClient) { }

  public listar(desc?: string, idCat?: string): Promise<Produto[]> {
    const query: any = {};
    if (desc) {
      query.descricao = desc;
    }
    if (idCat) {
      query.idCategoria = idCat;
    }

    return this.http.get<Produto[]>(this.produtoUri, {params: query}).pipe(share()).toPromise();
  }

  public salvar(produto: Produto): Promise<any> {
    return this.http.post(this.produtoUri, produto).pipe(share()).toPromise();
  }

  public listarPorCategoria(idCategoria: string): Promise<Produto[]> {
    if (idCategoria) {
      return this.http.get<Produto[]>(`${this.produtoPorCategoriaUri}/${idCategoria}`).pipe(share()).toPromise();
    } else {
      return Promise.resolve([]);
    }
  }
}
