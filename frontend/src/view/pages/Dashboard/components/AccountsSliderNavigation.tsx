import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountsSliderNavigation() {
  const swiper = useSwiper();

  return (
    <div className="flex items-center justify-center">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center hover:enabled:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center hover:enabled:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
