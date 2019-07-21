import { Model } from './model';
import { Categoria } from './categoria';

export class Tipo extends Model {
  descricao: string;
  categoria: Categoria;
}
