import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { openNewAccountDialog } = useDashboard();

  return {
    sliderState,
    setSliderState,
    isLoading: false,
    accounts: [],
    openNewAccountDialog,
  };
}
