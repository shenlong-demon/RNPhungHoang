import {Brand, Group, STATUS} from '@src/business';
import {BaseMode} from './base_model';

export type Product = BaseMode & {
  code?: string;
  name: string;
  otherName?: string;
  image?: string;
  price: number;
  quantity: number;
  status: STATUS;
  brandId: number;
  groupId: number;
  brand: Brand;
  group: Group;
};
