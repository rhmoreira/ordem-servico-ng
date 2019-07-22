import { Model } from './model';
import { Categoria } from './categoria';

export class Produto extends Model {

  constructor() {
    super();
    this.dimensoes = {
      largura: null,
      comprimento: null,
      altura: null,
    };
  }

  descricao: string;
  material: string;
  categoria: Categoria;

  dimensoes: {
    largura: number;
    comprimento: number;
    altura: number;
  };
}
