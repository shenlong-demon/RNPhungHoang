import {Brand, Group, STATUS} from '@src/business';

export type Product = {
  id: string;
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
