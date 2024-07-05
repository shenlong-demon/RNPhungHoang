import {BaseModel} from '@src/business/model/object/base_model';
import {Product} from '@src/business';

export type OperationItem = BaseModel & {
  productId?: number;
  product?: Product;
  price: number;
  quantity: number;
  note?: string;
  operationId: number;
};
