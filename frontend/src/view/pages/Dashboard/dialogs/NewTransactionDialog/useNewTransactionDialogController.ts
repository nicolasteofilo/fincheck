import { useDashboard } from "../../components/DashboardContext/useDashboard";

export function useNewTransactionDialog() {
  const { isNewTransactionDialogOpen, closeNewTransactionDialog, newTransactionType } = useDashboard();

  return {
    isNewTransactionDialogOpen,
    closeNewTransactionDialog,
    newTransactionType,
  };
}
