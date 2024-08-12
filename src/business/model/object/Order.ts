import { BaseModel } from '@src/business/model/object/base_model';
import { Product } from '@src/business';

export type Order = BaseModel & {
  name: string;
  quantity: number;
  price: number;
  total: number;
  product?: Product | null;
};
