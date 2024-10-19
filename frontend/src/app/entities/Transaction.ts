export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type Transaction = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: Date;
  type: "INCOME" | "EXPENSE";
}