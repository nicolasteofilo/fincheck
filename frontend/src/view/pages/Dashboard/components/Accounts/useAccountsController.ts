import { useMemo, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { openNewAccountDialog, openEditAccountDialog } = useDashboard();

  const { data: bankAccounts, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!bankAccounts) return 0;

    return bankAccounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
  }, [bankAccounts]);

  return {
    sliderState,
    setSliderState,
    isLoading: isFetching,
    accounts: bankAccounts || [],
    openNewAccountDialog,
    currentBalance,
    openEditAccountDialog,
  };
}
