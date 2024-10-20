import { useState } from "react";
import { useTransactions } from "../../../../../app/hooks/useTransactions";

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const { transactions, isFetching } = useTransactions();

  function handleOpenFiltersDialog() {
    setIsFiltersDialogOpen(true);
  }

  function handleCloseFiltersDialog() {
    setIsFiltersDialogOpen(false);
  }

  return {
    sliderState,
    setSliderState,
    isInitialLoading: false,
    isLoading: isFetching,
    transactions: transactions,
    isFiltersDialogOpen,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
  };
}
