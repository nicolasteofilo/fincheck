import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderNavigation } from "./SliderNavigation";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { useTransactionsController } from "./useTransactionsController";

export function Header() {
  const { sliderState, setSliderState } = useTransactionsController();

  return (
    <header>
      <div className="flex items-center justify-between">
        <button className="flex gap-2 items-center">
          <TransactionsIcon />
          <span className="text-gray-800 text-sm tracking-[-0.5px] font-medium">
            Transações
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
        <button className="flex items-center">
          <FilterIcon />
        </button>
      </div>

      <div className="mt-6 relative">
        <Swiper
          slidesPerView={3}
          centeredSlides
          onAfterInit={(swiper) => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
          onSlideChange={(swiper) => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
        >
          <SliderNavigation
            isBeginning={sliderState.isBeginning}
            isEnd={sliderState.isEnd}
          />
          {MONTHS.map((month, index) => (
            <SwiperSlide key={month}>
              {({ isActive }) => (
                <SliderOption month={month} isActive={isActive} index={index} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </header>
  );
}
