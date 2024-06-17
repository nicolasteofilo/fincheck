import { useDashboard } from "../../components/DashboardContext/useDashboard";

export function useNewAccountDialogController() {
  const { isNewAccountDialogOpen, closeNewAccountDialog } = useDashboard();

  return {
    isNewAccountDialogOpen,
    closeNewAccountDialog,
  };
}
