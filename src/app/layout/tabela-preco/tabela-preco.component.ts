import { TabelaPreco, ItemTabelaPreco } from './../../common/types/tabela-preco';
import { ProdutoService } from './../produto/produto.service';
import { ServicoService } from './../servico/servico.service';
import { Produto } from './../../common/types/produto';
import { Categoria } from 'src/app/common/types/categoria';
import { BaseComponent } from 'src/app/common/base.component';
import { ToastrService } from 'ngx-toastr';
import { TabelaPrecoService } from './tabela-preco.service';
import { CategoriaService } from './../categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Servico } from 'src/app/common/types/servico';
import { slideToRight, slideToLeft } from 'src/app/route-transitions';

@Component({
  selector: 'app-tabela-preco',
  templateUrl: './tabela-preco.component.html',
  styleUrls: ['./tabela-preco.component.css'],
  animations: [slideToRight(), slideToLeft()]
})
export class TabelaPrecoComponent extends BaseComponent implements OnInit {

  categorias: Categoria[];
  servicos: Servico[];
  produtos: Produto[];

  tabelaPreco: TabelaPreco;

  carregandoServicos: boolean;

  constructor(private categoriaService: CategoriaService,
              private servicoService: ServicoService,
              private produtoService: ProdutoService,
              private tabelaPrecoService: TabelaPrecoService,
              private toastrService: ToastrService) {

    super();
  }

  ngOnInit() {
    this.categoriaService.list().then(categorias => this.categorias = categorias);
  }

  public prepararNovaTabelaPreco(): void {
    this.tabelaPreco = new TabelaPreco();
    this.tabelaPreco.ativo = true;
  }

  public pesquisarServicos(idCategoria: string): void {
    if (!idCategoria) {
      return;
    }

    this.servicoService.listarPorCategoria(idCategoria)
        .then(servicos => {
          if (servicos.length === 0) {
            this.toastrService.warning('Não há nenhum serviço cadastrado para a categoria informada');
          } else {
            this.servicos = servicos;
          }
        }).finally(() => this.carregandoServicos = false);

    this.pesquisarProdutos(idCategoria);
  }

  public pesquisarProdutos(idCategoria: string): void {
    if (!idCategoria) {
      return;
    }
    delete this.produtos;
    this.produtoService.listarPorCategoria(idCategoria)
        .then(produtos => {
          if (produtos.length === 0) {
            this.toastrService.warning('Não há nenhum Produto cadastrado para a categoria informada');
            delete this.tabelaPreco.itens;
          } else {
            this.produtos = produtos;
            this.tabelaPreco.itens = [];
          }
        });
  }

  public adicionarItem(): void {
    const item = new ItemTabelaPreco();
    this.tabelaPreco.itens.push(item);
  }

  public removerItem(index: number): void {
    this.tabelaPreco.itens.splice(index, 1);
  }

  public salvar(tabelaPreco: TabelaPreco): void {
    this.tabelaPrecoService.salvar(tabelaPreco)
        .then(result => {
          this.toastrService.success('Tabela de preço salva!')
          this.resetInclusaoEdicao();
        });
  }

  private resetInclusaoEdicao(): void {
    delete this.tabelaPreco;
  }

}
