import { httpClient } from "../httpClient";

export interface BankAccountParams {
  name: string;
  type: "INVESTMENT" | "CASH" | "CHECKING";
  initialBalance: number;
  color: string;
}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}
