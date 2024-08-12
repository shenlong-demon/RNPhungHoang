import { BaseModel } from '@src/business/model/object/base_model';

export type Bill = BaseModel & {
  name?: string;
  total: number;
  receiptedAt: number;
  discount: number;
};
