import { Transaction } from "../../entities/Transaction";
import { httpClient } from "../httpClient";

export type TransactionsResponse = Transaction[];

export async function getAll() {
  const { data } = await httpClient.get<TransactionsResponse>("/transactions");

  return data
}
