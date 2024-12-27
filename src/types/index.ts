export type Transaction = {
  id?: string;
  type: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
};
