export type Sdo<T> = {
  data?: T | null | undefined;
  message?: string | null | undefined;
  code: string;

  isSuccess: boolean;
}
