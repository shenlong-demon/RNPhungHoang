import {BaseModel} from './base_model';

export type Brand = BaseModel & {
  name: string;
  status: number;
};
