import { httpClient } from "../httpClient";

export interface RemoveTransactionParams {
  id: string;
}

export async function remove({ id }: RemoveTransactionParams) {
  const { data } = await httpClient.delete(`/transactions/${id}`);

  return data;
}
