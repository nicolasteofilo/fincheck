import { QueryObserverResult, RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

import { Transaction } from "../entities/Transaction";
import { transactionsService } from "../services/transactionsService";
import { TransactionsFilter, TransactionsResponse } from "../services/transactionsService/getAll";

type IResponseUseTransactions = {
  transactions: Transaction[];
  isFetching: boolean;
  isInitialFetch: boolean;
  refetchTransactions: (options?: RefetchOptions) => Promise<QueryObserverResult<TransactionsResponse, Error>>;
  invalidateTransactions: () => void;
};

export function useTransactions(filters?: TransactionsFilter): IResponseUseTransactions {
  const queryClient = useQueryClient();
  const key = ["transactions"];

  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: key,
    queryFn: () => transactionsService.getAll(filters!),
  });

  function invalidateTransactions() {
    queryClient.invalidateQueries({ queryKey: key })
  }

  return {
    transactions: data ?? [],
    isFetching,
    isInitialFetch: isLoading,
    refetchTransactions: refetch,
    invalidateTransactions,
  };
}
