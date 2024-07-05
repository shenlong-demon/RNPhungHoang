import {BaseModel} from './base_model';

export type Group = BaseModel & {
  name: string;
  status: number;
};
