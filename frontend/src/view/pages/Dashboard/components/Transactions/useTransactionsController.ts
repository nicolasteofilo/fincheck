import { useEffect, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilter } from "../../../../../app/services/transactionsService/getAll";

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [isEditTransactionDialogOpen, setIsEditTransactionDialogOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>();
  const [filters, setFilters] = useState<TransactionsFilter>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isFetching, isInitialFetch, refetchTransactions } = useTransactions(filters);
  const { accounts } = useBankAccounts();

  function handleChangeFilters<K extends keyof TransactionsFilter>(filterName: K, value: TransactionsFilter[K]) {
    if (value === filters[filterName]) return; // no re-renders
    setFilters((prevState) => ({
      ...prevState,
      [filterName]: value,
    }));
  }

  function handleOpenFiltersDialog() {
    setIsFiltersDialogOpen(true);
  }

  function handleCloseFiltersDialog() {
    setIsFiltersDialogOpen(false);
  }

  function handleOpenEditTransactionDialog(transaction: Transaction) {
    setIsEditTransactionDialogOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditTransactionDialog() {
    setIsEditTransactionDialogOpen(false);
    setTransactionBeingEdited(null);
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  return {
    sliderState,
    setSliderState,
    isInitialLoading: isInitialFetch,
    isLoading: isFetching,
    transactions: transactions ?? [],
    isFiltersDialogOpen,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
    handleChangeFilters,
    filters,
    handleOpenEditTransactionDialog,
    handleCloseEditTransactionDialog,
    isEditTransactionDialogOpen,
    transactionBeingEdited,
    accounts,
  };
}
