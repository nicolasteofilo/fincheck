import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>("/auth/signup", params);

  return data;
}