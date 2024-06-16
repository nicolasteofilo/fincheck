import { useState } from "react";

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(true);

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
    isLoading: false,
    transactions: [1234],
    isFiltersDialogOpen,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
  };
}
