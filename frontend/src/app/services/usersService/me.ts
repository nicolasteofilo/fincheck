import { httpClient } from "../httpClient";

interface MeResponse {
  name: string;
  string: string;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}