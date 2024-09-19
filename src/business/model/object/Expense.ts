import { BaseModel } from './base_model';

export type Expense = BaseModel & {
  note: string;
  total: number;
};
