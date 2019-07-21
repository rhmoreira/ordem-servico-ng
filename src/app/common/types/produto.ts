import { Model } from './model';
import { Tipo } from './tipo';
import { Categoria } from './categoria';

export class Produto extends Model {
  descricao: string;
  material: string;
  tipo: Tipo;
  categoria: Categoria;

  dimensoes: [{
    largura: number;
    comprimento: number;
    altura: number;
  }];
}
