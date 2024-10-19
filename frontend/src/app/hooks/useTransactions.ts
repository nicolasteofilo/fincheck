import { useQuery } from "@tanstack/react-query";

import { Transaction } from "../entities/Transaction";
import { transactionsService } from "../services/transactionsService";

type IResponseUseTransactions = {
  transactions: Transaction[];
  isFetching: boolean;
};

export function useTransactions(): IResponseUseTransactions {
  const { data, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsService.getAll,
  });

  return {
    transactions: data ?? [],
    isFetching,
  };
}
