import {BaseMode} from './base_model';

export type User = BaseMode & {
  name: string;
  token: string;
  status: number;
};
