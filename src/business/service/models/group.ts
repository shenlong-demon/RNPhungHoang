import {BaseMode} from './base_model';

export type Group = BaseMode & {
  name: string;
  status: number;
};
