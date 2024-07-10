import {BaseModel} from '@src/business/model/object/base_model';

export type Customer = BaseModel & {
  name: string;
  phone: string;
  nickName: string;
  image?: string | null;
  status: number;
};
