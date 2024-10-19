import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string;
  type: "INVESTMENT" | "CASH" | "CHECKING" | "INVESTIMENT";
  initialBalance: number;
  color: string;
}

export async function create(params: CreateBankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}
