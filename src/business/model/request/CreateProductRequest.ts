export type CreateProductRequest = {
  appKey: string;
  name: string;
  code?: string;
  otherName?: string;
  image?: string;
  basePrice: number;
  price: number;
  quantity: number;
  status: number;
};
