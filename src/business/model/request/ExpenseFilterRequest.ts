export type ExpenseFilterRequest = {
  text?: string | null | undefined;
  date?: number | null | undefined;
  offset: number;
};
