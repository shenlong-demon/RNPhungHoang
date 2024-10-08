import { STATUS } from '@src/business';
import { BaseModel } from './base_model';

export type Product = BaseModel & {
  code?: string;
  name: string;
  otherName?: string;
  image?: string;
  basePrice: number;
  price: number;
  quantity: number;
  status: STATUS;
};
