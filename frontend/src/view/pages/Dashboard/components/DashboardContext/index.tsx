import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountDialogOpen: boolean;
  toogleValuesVasibility(): void;
  openNewAccountDialog(): void;
  closeNewAccountDialog(): void;
  isNewTransactionDialogOpen: boolean;
  isEditAccountDialogOpen: boolean;
  toogleValuesVasibility(): void;
  openNewTransactionDialog(type: "INCOME" | "EXPENSE"): void;
  closeNewTransactionDialog(): void;
  openEditAccountDialog(bankAccount: BankAccount): void;
  closeEditAccountDialog(): void;
  newTransactionType: "INCOME" | "EXPENSE";
  accountBeingEdited: null | BankAccount
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  const [isEditAccountDialogOpen, setIsEditAccountDialogOpen] = useState(false);
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

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

  const openEditAccountDialog = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountDialogOpen(true);
  }, []);

  const closeEditAccountDialog = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountDialogOpen(false);
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
        newTransactionType: newTransactionType || "INCOME",
        isEditAccountDialogOpen,
        openEditAccountDialog,
        closeEditAccountDialog,
        accountBeingEdited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
