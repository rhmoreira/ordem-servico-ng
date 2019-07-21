import { CategoriaService } from './categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { slideToBottom } from 'src/app/route-transitions';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/common/types/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  animations: [slideToBottom()]
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  novaCategoria: Categoria;

  idCategoriaEdicao: string;
  idCategoriaExclusao: string;
  idCategoriaSubstituta: string;
  substituir = false;

  constructor(private route: ActivatedRoute, private toastrService: ToastrService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.list().then(categorias => this.categorias = categorias);
  }

  public prepararNovaCategoria(): void {
    this.novaCategoria = new Categoria();
  }

  public salvar(categoria: Categoria): void {
    this.categoriaService
        .salvar(categoria)
        .then((res) => {
          this.toastrService.success('Categoria salva.');
          categoria.__v = res.__v;
          this.resetControls();

          this.ngOnInit();
        });
  }

  public excluirCategoria(categoria: Categoria): void {
    this.excluir(categoria._id);
  }

  public excluirComSubstituto(categoria: Categoria): void {
    this.excluir(categoria._id, this.idCategoriaSubstituta);
  }

  private excluir(idCategoria: string, idCategoriaSub?: string): void {
    this.resetControls();
    this.categoriaService
        .excluir(idCategoria, idCategoriaSub)
        .then((res) => {
          this.toastrService.success('Categoria excluida com sucesso.');
          this.resetControls();
          this.ngOnInit();
        }).catch(error => {
          if (error.erro === 'Categoria em uso') {
            this.toastrService.warning('Selecione uma categoria substituta para confirmar a exclusão', null, {positionClass: 'toast-top-center'});
            this.substituir = true;
            this.idCategoriaExclusao = idCategoria;
          }
        });
  }

  private resetControls(): void {
    delete this.novaCategoria;
    delete this.idCategoriaEdicao;
    delete this.idCategoriaExclusao;
    this.substituir = false;
  }

}
