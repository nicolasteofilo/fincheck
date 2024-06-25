import { useAccountsController } from "./useAccountsController";
import { Spinner } from "../../../../components/Spinner";
import { Balance } from "./Balance";
import { AccountsSlider } from "./AccountsSlider";

export function Accounts() {
  const {
    isLoading,
    accounts,
    sliderState,
    setSliderState,
    openNewAccountDialog,
    currentBalance,
    openEditAccountDialog,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 lg:p-10 text-white flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <Balance currentBalance={currentBalance} />
          <AccountsSlider
            accounts={accounts}
            sliderState={sliderState}
            setSliderState={setSliderState}
            openNewAccountDialog={openNewAccountDialog}
            openEditAccountDialog={openEditAccountDialog}
          />
        </>
      )}
    </div>
  );
}
