import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BankAccount } from "../entities/BankAccount";
import { bankAccountsService } from "../services/bankAccountsService";

type IResponseUseBankAccounts = {
  accounts: BankAccount[];
  isFetching: boolean;
  invalidateBankAccounts: () => void;
};

export function useBankAccounts(): IResponseUseBankAccounts {
  const queryClient = useQueryClient();
  const key = ["bankAccounts"];

  const { data, isFetching } = useQuery({
    queryKey: key,
    queryFn: bankAccountsService.getAll,
  });

  function invalidateBankAccounts() {
    queryClient.invalidateQueries({ queryKey: key })
  }

  return {
    accounts: data ?? [],
    isFetching,
    invalidateBankAccounts,
  };
}
