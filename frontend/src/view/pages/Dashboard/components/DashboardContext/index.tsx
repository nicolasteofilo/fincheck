import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toogleValuesVasibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toogleValuesVasibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, [])

  return (
    <DashboardContext.Provider value={{ areValuesVisible, toogleValuesVasibility }}>
      {children}
    </DashboardContext.Provider>
  );
}