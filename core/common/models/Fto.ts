export type Fto<T> = {
  code: string;
  data: T | null | undefined;
  isSuccess : boolean;
  message?: string | null | undefined;
};
