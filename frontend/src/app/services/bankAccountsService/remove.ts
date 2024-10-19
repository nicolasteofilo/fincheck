import { httpClient } from "../httpClient";

export interface RemoveBankAccountParams {
  id: string;
}

export async function remove({ id }: RemoveBankAccountParams) {
  const { data } = await httpClient.delete(`/bank-accounts/${id}`);

  return data;
}
