import { useQuery } from "@tanstack/react-query";
import { BankAccount } from "../entities/BankAccount";
import { bankAccountsService } from "../services/bankAccountsService";

type IResponseUseBankAccounts = {
  accounts: BankAccount[];
  isFetching: boolean;
};

export function useBankAccounts(): IResponseUseBankAccounts {
  const { data, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
  });

  return {
    accounts: data ?? [],
    isFetching,
  };
}
