import {BaseModel} from './base_model';

export type User = BaseModel & {
  name: string;
  token: string;
  status: number;
};
