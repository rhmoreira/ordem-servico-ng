import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Servico } from 'src/app/common/types/servico';
import { share } from 'rxjs/operators';

@Injectable()
export class ServicoService {

  private servicoUri = `${env.appUrl}/Servico`;
  private servicoPorCategoriaUri = `${env.appUrl}/Servico/Categoria`;

  constructor(private http: HttpClient) { }

  public listar(desc?: string, idCat?: string): Promise<Servico[]> {
    const query: any = {};
    if (desc) {
      query.descricao = desc;
    }
    if (idCat) {
      query.idCategoria = idCat;
    }

    return this.http.get<Servico[]>(this.servicoUri, {params: query}).pipe(share()).toPromise();
  }

  public salvar(servico: Servico): Promise<any> {
    return this.http.post(this.servicoUri, servico).pipe(share()).toPromise();
  }

  public listarPorCategoria(idCategoria: string): Promise<Servico[]> {
    if (idCategoria) {
      return this.http.get<Servico[]>(`${this.servicoPorCategoriaUri}/${idCategoria}`).pipe(share()).toPromise();
    } else {
      return Promise.resolve([]);
    }
  }
}
