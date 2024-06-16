import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderNavigation } from "./SliderNavigation";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { useTransactionsController } from "./useTransactionsController";
import { Dropdown } from "../../../../components/Dropdown";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";

interface HeaderProps {
  handleOpenFiltersDialog(): void;
}

export function Header({ handleOpenFiltersDialog }: HeaderProps) {
  const { sliderState, setSliderState } = useTransactionsController();

  return (
    <header>
      <div className="flex items-center justify-between">
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button className="flex gap-2 items-center">
              <TransactionsIcon />
              <span className="text-gray-800 text-sm tracking-[-0.5px] font-medium">
                Transações
              </span>
              <ChevronUpIcon className="text-gray-900" />
            </button>
          </Dropdown.Trigger>

          <Dropdown.Content className="mt-2 w-[279px]">
            <Dropdown.Item className="gap-2">
              <IncomeIcon />
              Receitas
            </Dropdown.Item>
            <Dropdown.Item className="gap-2">
              <ExpensesIcon />
              Despesas
            </Dropdown.Item>
            <Dropdown.Item className="gap-2">
              <TransactionsIcon />
              Transações
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
        <button className="flex items-center" onClick={handleOpenFiltersDialog}>
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
