import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { cn } from "../../../../../utils/cn";
import { AccountCard } from "./AccountCard";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const { eyeOpen, setEyeOpen, sliderState, setSliderState } =
    useAccountsController();

  function toogleEye() {
    setEyeOpen((prev) => !prev);
  }

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 lg:p-10 text-white flex flex-col">
      <div className="flex flex-col">
        <span className="tracking-[-0.5px]">Saldo total</span>

        <div className="flex gap-2 items-center">
          <strong
            className={cn("text-2xl tracking-[-1px]", !eyeOpen && "blur-sm")}
          >
            R$ 1000,00
          </strong>
          <button onClick={toogleEye} className="h-12 w-12">
            <EyeIcon open={eyeOpen} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
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

              <AccountsSliderNavigation
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
      </div>
    </div>
  );
}
