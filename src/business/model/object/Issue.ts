import {BaseModel} from '@src/business/model/object/base_model';

export type Issue = BaseModel & {
  note?: string;
  image?: string;
};
