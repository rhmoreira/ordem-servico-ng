import { Paging, handlePageChange } from './../../common/util/pagination-animation';
import { CategoriaService } from './categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { slideToBottom, pagination, slideToLeft, slideToRight } from 'src/app/route-transitions';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/common/types/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  animations: [slideToRight(), pagination()]
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];
  novaCategoria: Categoria;

  idCategoriaEdicao: string;
  idCategoriaExclusao: string;
  idCategoriaSubstituta: string;
  substituir = false;

  paging = new Paging('navRight');

  constructor(private toastrService: ToastrService, private categoriaService: CategoriaService) { }

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
            this.toastrService.warning('Selecione uma categoria substituta para confirmar a exclusão', error.erro, {timeOut: 10000});
            this.substituir = true;
            this.idCategoriaExclusao = idCategoria;
          }
        });
  }

  @HostListener('document:keyup.escape')
  private resetControls(): void {
    delete this.novaCategoria;
    delete this.idCategoriaEdicao;
    delete this.idCategoriaExclusao;
    this.substituir = false;
  }

  public pageChange(page: number): void {
    handlePageChange(page, this.paging);
  }

}
