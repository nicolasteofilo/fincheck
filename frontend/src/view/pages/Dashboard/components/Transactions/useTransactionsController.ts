import { useState } from "react";

export function useTransactionsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    isInitialLoading: false,
    isLoading: true,
    transactions: [1234],
  };
}
