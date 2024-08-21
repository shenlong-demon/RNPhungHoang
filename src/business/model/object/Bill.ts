import { BaseModel } from '@src/business/model/object/base_model';
import { BillIssue } from '@src/business/model/object/BillIssue';
import { Order } from '@src/business/model/object/Order';
import { Customer } from '@src/business';

export type Bill = BaseModel & {
  name?: string;
  total: number;
  receiptedAt: number;
  customer?: Customer | null;
  discount: number;
  orders: Order[];
  issues: BillIssue[];
};
