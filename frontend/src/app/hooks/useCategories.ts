import { useQuery } from "@tanstack/react-query";

import { useMemo } from "react";
import { useDashboard } from "../../view/pages/Dashboard/components/DashboardContext/useDashboard";
import { Category } from "../entities/Category";
import { categoriesService } from "../services/categoriesService";

type IResponseUseCategories = {
  categories: Category[];
  isFetching: boolean;
};

export function useCategories(): IResponseUseCategories {
  const { newTransactionType } = useDashboard();

  const { data: categoriesList, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
  });

  const categories = useMemo(() => {
    return categoriesList?.filter((category) => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  return {
    categories: categories ?? [],
    isFetching,
  };
}
