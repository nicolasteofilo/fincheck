import { Swiper, SwiperSlide } from "swiper/react";
import { SliderNavigation } from "../SliderNavigation";
import { AccountCard } from "./AccountCard";
import { PlusIcon } from "@radix-ui/react-icons";
import { BankAccountsResponse } from "../../../../../../app/services/bankAccountsService/getAll";
import { BankAccount } from "../../../../../../app/entities/BankAccount";

interface AccountsSliderProps {
  accounts: BankAccountsResponse;
  sliderState: { isBeginning: boolean; isEnd: boolean };
  setSliderState(
    value: React.SetStateAction<{
      isBeginning: boolean;
      isEnd: boolean;
    }>
  ): void;
  openNewAccountDialog(): void;
  openEditAccountDialog(bankAccount: BankAccount): void;
}

export function AccountsSlider({
  accounts,
  setSliderState,
  openNewAccountDialog,
  sliderState,
  openEditAccountDialog,
}: AccountsSliderProps) {
  return (
    <div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
      {accounts.length === 0 && (
        <>
          <div className="mb-4">
            <strong className="tracking-[-1px] text-lg">Minhas contas</strong>

            <button
              onClick={openNewAccountDialog}
              className="mt-4 h-52 border-2 border-teal-600 border-dashed rounded-2xl w-full font-medium flex flex-col items-center justify-center gap-4 text-white"
            >
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
            <div slot="container-start" className="flex items-center justify-between mb-4">
              <strong className="tracking-[-1px] text-lg">Minhas contas</strong>

              <SliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
            </div>

            <div>
              {accounts.map((account) => (
                <SwiperSlide key={account.id} onClick={() => openEditAccountDialog(account)}>
                  <AccountCard
                    name={account.name}
                    color={account.color}
                    currentBalance={account.currentBalance}
                    type={account.type}
                    id={account.id}
                    userId={account.userId}
                    initialBalance={account.initialBalance}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
}
