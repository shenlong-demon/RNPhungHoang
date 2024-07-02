import {BaseMode} from './base_model';

export type Brand = BaseMode & {
  name: string;
  status: number;
};
