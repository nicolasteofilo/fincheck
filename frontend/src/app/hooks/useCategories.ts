import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Category } from "../entities/Category";
import { categoriesService } from "../services/categoriesService";

type IResponseUseCategories = {
  categories: Category[];
  isFetching: boolean;
  invalidateCategories: () => void;
};

export function useCategories(): IResponseUseCategories {
  const queryClient = useQueryClient();
  const key = ["categories"];

  const { data: categoriesList, isFetching } = useQuery({
    queryKey: key,
    queryFn: categoriesService.getAll,
  });

  function invalidateCategories() {
    queryClient.invalidateQueries({ queryKey: key })
  }

  return {
    categories: categoriesList ?? [],
    isFetching,
    invalidateCategories,
  };
}
