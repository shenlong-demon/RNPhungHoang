import { BaseModel } from '@src/business/model/object/base_model';
import { BillIssue } from '@src/business/model/object/BillIssue';
import { Order } from '@src/business/model/object/Order';

export type Bill = BaseModel & {
  name?: string;
  total: number;
  receiptedAt: number;
  discount: number;
  orders: Order[];
  issues: BillIssue[];
};
