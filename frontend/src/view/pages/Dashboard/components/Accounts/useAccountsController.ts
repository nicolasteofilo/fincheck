import { useState } from "react";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const [eyeOpen, setEyeOpen] = useState(true);

  return {
    sliderState,
    setSliderState,
    eyeOpen,
    setEyeOpen,
  };
}
