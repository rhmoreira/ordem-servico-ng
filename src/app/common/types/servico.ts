import { Model } from './model';
import { Categoria } from './categoria';

export class Servico extends Model {
  descricao: string;
  categoria: Categoria;
}
