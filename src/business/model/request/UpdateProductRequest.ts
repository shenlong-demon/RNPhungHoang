export type UpdateProductRequest = {
  name: string;
  code?: string;
  otherName?: string;
  image?: string;
  price: number;
  brandId: number;
  groupId: number;
  status: number;
};
