import { QueryObserverResult, RefetchOptions, useQuery } from "@tanstack/react-query";

import { Transaction } from "../entities/Transaction";
import { transactionsService } from "../services/transactionsService";
import { TransactionsFilter, TransactionsResponse } from "../services/transactionsService/getAll";

type IResponseUseTransactions = {
  transactions: Transaction[];
  isFetching: boolean;
  isInitialFetch: boolean;
  refetchTransactions: (options?: RefetchOptions) => Promise<QueryObserverResult<TransactionsResponse, Error>>;
};

export function useTransactions(filters: TransactionsFilter): IResponseUseTransactions {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filters),
    enabled: false,
  });

  return {
    transactions: data ?? [],
    isFetching,
    isInitialFetch: isLoading,
    refetchTransactions: refetch,
  };
}
