export type Dto<T> = {
  code: number;
  data?: T | null | undefined;
  isSuccess: boolean;
  message?: string | null | undefined;
};
