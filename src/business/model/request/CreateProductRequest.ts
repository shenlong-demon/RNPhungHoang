export type CreateProductRequest = {
  appKey: string;
  name: string;
  code?: string;
  otherName?: string;
  image?: string;
  basePrice: number;
  price: number;
  quantity: number;
  brandId: number;
  groupId: number;
  status: number;
};
