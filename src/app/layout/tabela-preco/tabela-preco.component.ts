import { TabelaPreco, ItemTabelaPreco } from './../../common/types/tabela-preco';
import { ProdutoService } from './../produto/produto.service';
import { ServicoService } from './../servico/servico.service';
import { Produto } from './../../common/types/produto';
import { Categoria } from 'src/app/common/types/categoria';
import { BaseComponent } from 'src/app/common/base.component';
import { ToastrService } from 'ngx-toastr';
import { TabelaPrecoService } from './tabela-preco.service';
import { CategoriaService } from './../categoria/categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Servico } from 'src/app/common/types/servico';
import { slideToRight, slideToLeft, slideToTop } from 'src/app/route-transitions';

@Component({
  selector: 'app-tabela-preco',
  templateUrl: './tabela-preco.component.html',
  styleUrls: ['./tabela-preco.component.css'],
  animations: [slideToRight(), slideToLeft(), slideToTop()]
})
export class TabelaPrecoComponent extends BaseComponent implements OnInit {

  @ViewChild('referenciaTelaTabelaPreco', {static: true}) spanRefTabelaPreco: HTMLElement;

  categorias: Categoria[];
  servicos: Servico[];
  produtos: Produto[];

  tabelaPreco: TabelaPreco;
  tabelasPreco: TabelaPreco[];

  filtroPesquisa = {
    nome: null,
    idCategoria: null,
    idProduto: null,
    idServico: null,
    ativo: null
  };

  categoriasPesquisa: Categoria[];
  servicosPesquisa: Servico[];
  produtosPesquisa: Produto[];

  carregandoServicos: boolean;

  constructor(private categoriaService: CategoriaService,
              private servicoService: ServicoService,
              private produtoService: ProdutoService,
              private tabelaPrecoService: TabelaPrecoService,
              private toastrService: ToastrService) {

    super();
  }

  ngOnInit() {
    this.categoriaService.list().then(categorias => {
      this.categorias = categorias;
      this.categoriasPesquisa = categorias;
    });
  }

  public prepararNovaTabelaPreco(): void {
    this.tabelaPreco = new TabelaPreco();
    this.tabelaPreco.ativo = true;
  }

  public pesquisarServicosNovaTabela(idCategoria: string): void {
    this.pesquisarServicos(idCategoria,
      (servicos) => {
        if (servicos.length === 0) {
          this.toastrService.warning('Não há nenhum serviço cadastrado para a categoria informada');
        } else {
          this.servicos = servicos;
        }
    }, (produtos) => {
      if (produtos.length === 0) {
        this.toastrService.warning('Não há nenhum Produto cadastrado para a categoria informada');
        delete this.tabelaPreco.itens;
      } else {
        this.produtos = produtos;
        this.tabelaPreco.itens = [];
      }
    });
  }

  public pesquisarServicosBusca(): void {
    this.pesquisarServicos(this.filtroPesquisa.idCategoria,
      (servicos) => this.servicosPesquisa = servicos,
      (produtos) => this.produtosPesquisa = produtos);
  }

  public pesquisarServicos(idCategoria: string, callbackServicos: (servicos: Servico[]) => void, callbackProdutos: (produtos: Produto[]) => void): void {
    if (!idCategoria) {
      return;
    }

    this.carregandoServicos = true;
    this.servicoService.listarPorCategoria(idCategoria)
        .then(servicos => callbackServicos(servicos))
        .finally(() => this.carregandoServicos = false);

    this.pesquisarProdutos(idCategoria, callbackProdutos);
  }

  public pesquisarProdutos(idCategoria: string, callbackProdutos: (produtos: Produto[]) => void): void {
    if (!idCategoria) {
      return;
    }
    delete this.produtos;
    this.produtoService.listarPorCategoria(idCategoria)
        .then(produtos => callbackProdutos(produtos));
  }

  public adicionarItem(prodIndex: number): void {
    prodIndex = prodIndex || undefined;
    if (prodIndex >= 0) {
      const produto = this.produtos[prodIndex];
      this.produtos.splice(prodIndex, 1);

      const item = new ItemTabelaPreco();
      item.produto = produto;
      this.tabelaPreco.itens.push(item);
    }
  }

  public removerItem(index: number): void {
    const item = this.tabelaPreco.itens[index];
    this.produtos.push(item.produto);

    this.tabelaPreco.itens.splice(index, 1);
  }

  public salvar(tabelaPreco: TabelaPreco): void {
    this.tabelaPrecoService.salvar(tabelaPreco)
        .then(result => {
          this.toastrService.success('Tabela de preço salva!');
          this.resetInclusaoEdicao();
        });
  }

  private resetInclusaoEdicao(): void {
    delete this.tabelaPreco;
  }

  public pesquisar(): void {
    this.tabelaPrecoService
        .pesquisar(
          this.filtroPesquisa.nome,
          this.filtroPesquisa.idCategoria,
          this.filtroPesquisa.idServico,
          this.filtroPesquisa.idProduto,
          this.filtroPesquisa.ativo)
        .then(tabelas => {
          this.tabelasPreco = tabelas;
          if (!tabelas || tabelas.length === 0) {
            this.toastrService.warning('Nenhumna tabela de preço encontrada');
          }
        });
  }

}
