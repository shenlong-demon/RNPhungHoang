export type Dto<T> = {
  code: string;
  data?: T | null | undefined;
  isSuccess: boolean;
  message?: string | null | undefined;
};
