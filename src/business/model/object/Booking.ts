import {BaseModel} from '@src/business/model/object/base_model';
import {Product} from '@src/business';

export type Booking = BaseModel & {
  productId?: number;
  product?: Product;
  price: number;
  quantity: number;
  note?: string;
  operationId: number;
  name: string;
};
