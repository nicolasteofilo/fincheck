export enum BankAccountType {
  CHECKING = 'CHECKING',
  INVESTIMENT = 'INVESTIMENT',
  CACHE = 'CACHE',
}

export interface BankAccount {
  id: string
  userId: string
  name: string
  initialBalance: number
  type: string
  color: string
  transactions: Transaction[]
  currentBalance?: number
}

export interface Transaction {
  type: string
  value: number
}