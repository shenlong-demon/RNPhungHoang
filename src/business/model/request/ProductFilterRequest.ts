export type ProductFilterRequest = {
  name?: string | null | undefined;
  brandId?: number | null | undefined;
  groupId?: number | null | undefined;
  status?: number | null | undefined;
  offset: number;
};
