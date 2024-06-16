import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface SliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({ isBeginning, isEnd }: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className="flex items-center justify-center">
      <button
        className="z-10 w-8 h-8 rounded-full flex items-center justify-center hover:enabled:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        className="z-10 w-8 h-8 rounded-full flex items-center justify-center hover:enabled:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
