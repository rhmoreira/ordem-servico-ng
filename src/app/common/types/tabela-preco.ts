import { Model } from './model';
import { Categoria } from './categoria';
import { Servico } from './servico';
import { Produto } from './produto';

export class TabelaPreco extends Model {

  nome: string;
  ativo: string;
  servico: Servico;

  itens: [{
    precoProduto: number;
    precoServico: number;
    produto: Produto;
  }];
}
