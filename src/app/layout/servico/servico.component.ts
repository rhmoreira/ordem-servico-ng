import { CategoriaService } from './../categoria/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { ServicoService } from './servico.service';
import { Servico } from './../../common/types/servico';
import { Categoria } from 'src/app/common/types/categoria';
import { Component, OnInit } from '@angular/core';
import { slideToBottom, slideToRight, pagination } from 'src/app/route-transitions';
import { BaseComponent } from 'src/app/common/base.component';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css'],
  animations: [slideToBottom(), pagination(), slideToRight()]
})
export class ServicoComponent extends BaseComponent implements OnInit {

  filtroPesquisa = {
    descricao: null,
    idCategoria: null
  };
  categorias: Categoria[];

  idServicoEdicao: string;

  servicos: Servico[];
  novoServico: Servico;

  constructor(private servicoService: ServicoService,
              private categoriaService: CategoriaService,
              private toastrService: ToastrService) {
    super();
  }

  ngOnInit() {
    this.categoriaService.list().then(categorias => this.categorias = categorias);
  }

  public pesquisar(): void {
    delete this.servicos;
    this.resetEdicao();

    this.servicoService.listar(this.filtroPesquisa.descricao, this.filtroPesquisa.idCategoria)
        .then(servicos => {
          if (!servicos || servicos.length === 0) {
            this.toastrService.info('Nenhum serviço encontrado');
          } else {
            this.servicos = servicos;
          }
        });
  }

  public prepararNovoServico(): void {
    if (!this.novoServico) {
      this.novoServico = new Servico();
    }
  }

  public salvar(servico: Servico): void {
    this.salvarServico(servico, () => {
      this.filtroPesquisa.idCategoria = servico.categoria;
      this.resetInclusao();
      this.pesquisar();
    });
  }

  public atualizar(servico: Servico): void {
    this.salvarServico(servico, () => {
      this.pesquisar();
    });
  }

  public excluir(servico: Servico): void {

  }

  private salvarServico(servico: Servico, callback: () => void): void {
    this.servicoService.salvar(servico).then((response) => {
      this.toastrService.success('Serviço salvo!');
      callback();
    });
  }

  private resetPesquisa(): void {
    delete this.filtroPesquisa.descricao;
    delete this.filtroPesquisa.idCategoria;
    delete this.servicos;
  }

  private resetEdicao(): void {
    delete this.idServicoEdicao;
  }

  private resetInclusao(): void {
    delete this.novoServico;
  }

  private resetControls(): void {
    this.resetPesquisa();
    this.resetEdicao();
    this.resetInclusao();
  }
}
