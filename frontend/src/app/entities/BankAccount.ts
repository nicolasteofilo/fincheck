export type BankAccount = {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  color: string;
  currentBalance: number;
};