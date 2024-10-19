import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name?: string;
  type?: "INVESTMENT" | "CASH" | "CHECKING";
  initialBalance?: number;
  color?: string;
}

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}
