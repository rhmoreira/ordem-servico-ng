import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/common/types/categoria';
import { share } from 'rxjs/operators';

@Injectable()
export class CategoriaService {

  private categoriaUri = `${env.appUrl}/Categoria`;

  constructor(private http: HttpClient) { }

  public list(): Promise<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriaUri).pipe(share()).toPromise();
  }

  public salvar(categoria: Categoria): Promise<any> {
    return this.http.post(this.categoriaUri, categoria).pipe(share()).toPromise();
  }

  public excluir(idCategoria: string, idCategoriaSubstituta?: string): Promise<any> {
    let deleteCategoriaUri = `${this.categoriaUri}/${idCategoria}`;
    if (idCategoriaSubstituta) {
      deleteCategoriaUri += `/${idCategoriaSubstituta}`;
    }
    return this.http.delete(deleteCategoriaUri).pipe(share()).toPromise();
  }
}
