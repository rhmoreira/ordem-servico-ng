import { Categoria } from './../../common/types/categoria';
import { CategoriaService } from './../categoria/categoria.service';
import { ProdutoService } from './produto.service';
import { BaseComponent } from 'src/app/common/base.component';
import { Produto } from './../../common/types/produto';
import { Component, OnInit } from '@angular/core';
import { slideToRight, slideToTop } from 'src/app/route-transitions';
import { ToastrService } from 'ngx-toastr';
import { PassivationComponent } from 'src/app/common/passivation.component';

export interface ProdutoData {
  novoProduto: Produto;
  produtos: Produto[];
  idProdutoEdicao: string;

  filtroPesquisa: {
    descricao: string;
    idCategoria: string;
  },

  categorias: Categoria[];
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  animations: [slideToRight(), slideToTop()]
})
export class ProdutoComponent extends PassivationComponent<ProdutoData> implements OnInit {

  constructor(private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private toastrService: ToastrService) {
    super('produtos-comp');

    this.initializeData();
   }

   private initializeData(): void {
     super.data = {
      novoProduto: null,
      produtos: null,
      idProdutoEdicao: null,

      filtroPesquisa: {
        descricao: null,
        idCategoria: null
      },

      categorias: null
    };
   }

  ngOnInit() {
    super.activate(true);
    this.categoriaService.list().then(categorias => this.data.categorias = categorias);
  }

  public pesquisar(): void {
    delete this.data.produtos;
    this.resetEdicao();
    this.produtoService.listar(this.data.filtroPesquisa.descricao, this.data.filtroPesquisa.idCategoria)
        .then(produtos => {
          if (produtos.length === 0) {
            this.toastrService.info('Nenhum produto encontrado');
          } else {
            this.data.produtos = produtos;
          }
        });
  }

  public prepararNovoProduto(): void {
    if (!this.data.novoProduto) {
      this.data.novoProduto = new Produto();
    }
  }

  public salvar(produto: Produto): void {
    this.salvarServico(produto, () => {
      this.data.filtroPesquisa.idCategoria = <string><any> produto.categoria;
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
    delete this.data.filtroPesquisa.descricao;
    delete this.data.filtroPesquisa.idCategoria;
    delete this.data.produtos;
  }

  private resetInclusao(): void {
    delete this.data.novoProduto;
  }

  private resetEdicao(): void {
    delete this.data.idProdutoEdicao;
  }

  private resetControls(): void {
    this.resetPesquisa();
    this.resetInclusao();
  }

}
