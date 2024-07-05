import {BaseModel} from '@src/business/model/object/base_model';
import {Customer, OperationItem} from '@src/business';

export type Operation = BaseModel & {
  name?: string;
  phone?: string;
  note?: string;
  customer?: Customer;
  customerId?: number;
  items: OperationItem[];
};