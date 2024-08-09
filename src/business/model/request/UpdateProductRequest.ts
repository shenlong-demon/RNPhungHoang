export type UpdateProductRequest = {
  name: string;
  code?: string;
  otherName?: string;
  image?: string;
  basePrice: number;
  price: number;
  brandId: number;
  groupId: number;
  status: number;
};
