import { Category } from "../../entities/Category";
import { httpClient } from "../httpClient";

export type CategoriesResponse = Category[];

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>("/categories");

  return data;
}