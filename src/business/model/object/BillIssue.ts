import { BaseModel } from '@src/business/model/object/base_model';

export type BillIssue = BaseModel & {
  note: string;
  image?: string;
};
