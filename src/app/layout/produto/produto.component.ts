import { Categoria } from './../../common/types/categoria';
import { CategoriaService } from './../categoria/categoria.service';
import { ProdutoService } from './produto.service';
import { BaseComponent } from 'src/app/common/base.component';
import { Produto } from './../../common/types/produto';
import { Component, OnInit } from '@angular/core';
import { slideToRight, slideToTop } from 'src/app/route-transitions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  animations: [slideToRight(), slideToTop()]
})
export class ProdutoComponent extends BaseComponent implements OnInit {

  novoProduto: Produto;
  produtos: Produto[];

  filtroPesquisa = {
    descricao: null,
    idCategoria: null
  };

  categorias: Categoria[];

  constructor(private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private toastrService: ToastrService) {
    super();
   }

  ngOnInit() {
    this.categoriaService.list().then(categorias => this.categorias = categorias);
  }

  public pesquisar(): void {
    delete this.produtos;
    this.produtoService.listar(this.filtroPesquisa.descricao, this.filtroPesquisa.idCategoria)
        .then(produtos => {
          if (produtos.length === 0) {
            this.toastrService.info('Nenhum produto encontrado');
          } else {
            this.produtos = produtos;
          }
        });
  }

  public prepararNovoProduto(): void {
    if (!this.novoProduto) {
      this.novoProduto = new Produto();
    }
  }

  public salvar(produto: Produto): void {
    this.salvarServico(produto, () => {
      this.filtroPesquisa.idCategoria = produto.categoria;
      this.resetInclusao();
      this.pesquisar();
    });
  }

  public atualizar(produto: Produto): void {
    this.salvarServico(produto, () => {
      this.pesquisar();
    });
  }

  public excluir(produto: Produto): void {

  }

  private salvarServico(produto: Produto, callback: () => void): void {
    this.produtoService.salvar(produto).then((response) => {
      this.toastrService.success('Produto salvo!');
      callback();
    });
  }

  private resetPesquisa(): void {
    delete this.filtroPesquisa.descricao;
    delete this.filtroPesquisa.idCategoria;
    delete this.produtos;
  }

  private resetInclusao(): void {
    delete this.novoProduto;
  }

  private resetControls(): void {
    this.resetPesquisa();
    this.resetInclusao();
  }

}
