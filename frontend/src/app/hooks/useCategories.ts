import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo } from "react";
import { useDashboard } from "../../view/pages/Dashboard/components/DashboardContext/useDashboard";
import { Category } from "../entities/Category";
import { categoriesService } from "../services/categoriesService";

type IResponseUseCategories = {
  categories: Category[];
  isFetching: boolean;
  invalidateCategories: () => void;
};

export function useCategories(): IResponseUseCategories {
  const { newTransactionType } = useDashboard();
  const queryClient = useQueryClient();
  const key = ["categories"];

  const { data: categoriesList, isFetching } = useQuery({
    queryKey: key,
    queryFn: categoriesService.getAll,
  });

  const categories = useMemo(() => {
    return categoriesList?.filter((category) => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  function invalidateCategories() {
    queryClient.invalidateQueries({ queryKey: key })
  }

  return {
    categories: categories ?? [],
    isFetching,
    invalidateCategories,
  };
}
