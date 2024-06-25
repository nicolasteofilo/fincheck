import { BankAccount } from "../../entities/BankAccount";
import { httpClient } from "../httpClient";

export type BankAccountsResponse = BankAccount[];

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>("/bank-accounts");

  return data;
}
