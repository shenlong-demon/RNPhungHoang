export type CreateProductRequestSdo = {
  name: string;
  otherName?: string;
  image?: string;
  price: number;
  quantity: number;
  brandId: number;
  groupId: number;
};
