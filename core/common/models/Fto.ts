export type Fto<T> = {
  code: number;
  data: T | null | undefined;
  isSuccess : boolean;
};
