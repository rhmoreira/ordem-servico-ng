import { Model } from './model';
import { Categoria } from './categoria';

export class Produto extends Model {
  descricao: string;
  material: string;
  categoria: Categoria;

  dimensoes: [{
    largura: number;
    comprimento: number;
    altura: number;
  }];
}
