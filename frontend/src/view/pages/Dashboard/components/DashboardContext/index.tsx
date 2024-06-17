import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountDialogOpen: boolean;
  toogleValuesVasibility(): void;
  openNewAccountDialog(): void;
  closeNewAccountDialog(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(true);

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

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountDialogOpen,
        toogleValuesVasibility,
        openNewAccountDialog,
        closeNewAccountDialog,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
