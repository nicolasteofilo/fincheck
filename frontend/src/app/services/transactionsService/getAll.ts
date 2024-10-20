import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

export type TransactionsResponse = Transaction[];

export type TransactionsFilter = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
};

export async function getAll(filter: TransactionsFilter) {
  const { data } = await httpClient.get<TransactionsResponse>("/transactions", {
    params: filter
  });

  return data;
}
