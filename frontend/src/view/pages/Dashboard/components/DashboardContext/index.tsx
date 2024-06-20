import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountDialogOpen: boolean;
  toogleValuesVasibility(): void;
  openNewAccountDialog(): void;
  closeNewAccountDialog(): void;
  isNewTransactionDialogOpen: boolean;
  toogleValuesVasibility(): void;
  openNewTransactionDialog(type: "INCOME" | "EXPENSE"): void;
  closeNewTransactionDialog(): void;
  newTransactionType: "INCOME" | "EXPENSE";
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] =
    useState(true);
  const [newTransactionType, setNewTransactionType] = useState<
    "INCOME" | "EXPENSE" | null
  >(null);

  console.log({ isNewAccountDialogOpen });

  const toogleValuesVasibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, []);

  const openNewAccountDialog = useCallback(() => {
    setIsNewAccountDialogOpen(true);
  }, []);

  const closeNewAccountDialog = useCallback(() => {
    setIsNewAccountDialogOpen(false);
  }, []);

  const openNewTransactionDialog = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type);
    setIsNewTransactionDialogOpen(true);
  }, []);

  const closeNewTransactionDialog = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionDialogOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountDialogOpen,
        toogleValuesVasibility,
        openNewAccountDialog,
        closeNewAccountDialog,
        isNewTransactionDialogOpen,
        openNewTransactionDialog,
        closeNewTransactionDialog,
        newTransactionType: newTransactionType || 'INCOME',
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
