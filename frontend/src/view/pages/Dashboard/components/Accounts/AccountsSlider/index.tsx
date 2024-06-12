import { Swiper, SwiperSlide } from "swiper/react";
import { SliderNavigation } from "../SliderNavigation";
import { AccountCard } from "./AccountCard";
import { useAccountsController } from "../useAccountsController";
import { PlusIcon } from "@radix-ui/react-icons";

export function AccountsSlider() {
  const { sliderState, setSliderState, accounts } = useAccountsController();

  return (
    <div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
      {accounts.length === 0 && (
        <>
          <div className="mb-4">
            <strong className="tracking-[-1px] text-lg">Minhas contas</strong>

            <button className="mt-4 h-52 border-2 border-teal-600 border-dashed rounded-2xl w-full font-medium flex flex-col items-center justify-center gap-4 text-white">
              <div className="w-11 h-11 border-2 border-dashed rounded-full flex items-center justify-center">
                <PlusIcon className="w-6 h-6" />
              </div>
              <span className="font-medium tracking-[-0.5px] block w-32 text-center">Cadastre uma nova conta</span>
            </button>
          </div>
        </>
      )}

      {accounts.length > 0 && (
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.3}
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
            breakpoints={{
              0: {
                slidesPerView: 1.3,
              },
              480: {
                slidesPerView: 1.3,
              },
              640: {
                slidesPerView: 2.3,
              },
            }}
          >
            <div
              slot="container-start"
              className="flex items-center justify-between mb-4"
            >
              <strong className="tracking-[-1px] text-lg">Minhas contas</strong>

              <SliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <div>
              <SwiperSlide>
                <AccountCard
                  name="Nubank"
                  color="#7950F2"
                  balance={123.23}
                  type="INVESTMENT"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  name="Inter"
                  color="#7950F2"
                  balance={123.23}
                  type="INVESTMENT"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  name="Carteira"
                  color="#7950F2"
                  balance={123.23}
                  type="INVESTMENT"
                />
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
}
