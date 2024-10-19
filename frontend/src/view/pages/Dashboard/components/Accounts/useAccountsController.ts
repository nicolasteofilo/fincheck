import { useMemo, useState } from "react";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { openNewAccountDialog, openEditAccountDialog } = useDashboard();
  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    if (!accounts) return 0;
    return accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    isLoading: isFetching,
    accounts,
    openNewAccountDialog,
    currentBalance,
    openEditAccountDialog,
  };
}
