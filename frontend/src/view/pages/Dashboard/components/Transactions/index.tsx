import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants.ts";
import emptyStateIlustration from "../../../../../assets/empty-state.svg";
import { cn } from "../../../../../utils/cn";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { formatDate } from "../../../../../utils/formatDate.ts";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon.tsx";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { EditTransactionDialog } from "../../dialogs/EditTransactionDialog/index.tsx";
import { useDashboard } from "../DashboardContext/useDashboard";
import { FiltersDialog } from "./FiltersDialog/index.tsx";
import { SliderNavigation } from "./SliderNavigation.tsx";
import { SliderOption } from "./SliderOption.tsx";
import { TransactionsTypeDropdown } from "./TransactionsTypeDropdown.tsx";
import { useTransactionsController } from "./useTransactionsController";

export function Transactions() {
  const {
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersDialogOpen,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
    handleChangeFilters,
    filters,
    sliderState,
    setSliderState,
    isEditTransactionDialogOpen,
    handleCloseEditTransactionDialog,
    handleOpenEditTransactionDialog,
    transactionBeingEdited,
    accounts,
  } = useTransactionsController();
  const { areValuesVisible } = useDashboard();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-200 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          {isFiltersDialogOpen && (
            <FiltersDialog
              open={isFiltersDialogOpen}
              onClose={handleCloseFiltersDialog}
              handleChangeFilters={handleChangeFilters}
            />
          )}

          <header>
            <div className="flex items-center justify-between">
              <TransactionsTypeDropdown
                onSelect={(type) => {
                  handleChangeFilters("type", type);
                }}
                selectedType={filters.type}
              />
              <button className="flex items-center" onClick={handleOpenFiltersDialog}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative z-[0]">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onAfterInit={(swiper) => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  });
                }}
                onSlideChange={(swiper) => {
                  handleChangeFilters("month", swiper.realIndex);

                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd,
                  });
                }}
              >
                <SliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => <SliderOption month={month} isActive={isActive} index={index} />}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {(!hasTransactions || isLoading) && (
              <div className="w-full h-full flex items-center justify-center flex-col">
                {isLoading && <Spinner className="w-10 h-10" />}

                {!hasTransactions && !isLoading && (
                  <>
                    <img src={emptyStateIlustration} alt="Nenhuma transação encontrada" />
                    <p className="text-gray-700 mt-4">Não encontramos nenhuma transação!</p>
                  </>
                )}
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactions.map((transaction) => {
                  const typeLower = transaction.type.toLocaleLowerCase() as "income" | "expense";

                  return (
                    <div
                      onClick={() => handleOpenEditTransactionDialog(transaction)}
                      key={transaction.id}
                      className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <CategoryIcon type={typeLower} category={transaction.category?.icon} />
                        <div>
                          <strong className="text-gray-800 font-bold tracking-[-0.5px] block">
                            {transaction.name}
                          </strong>
                          <span className="text-sm text-gray-600">{formatDate(new Date(transaction.date))}</span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "tracking-[-0.5px] font-medium",
                          !areValuesVisible && "blur-sm",
                          transaction.type === "EXPENSE" ? "text-red-800" : "text-green-800"
                        )}
                      >
                        {transaction.type === "EXPENSE" ? "-" : "+"}
                        {formatCurrency(transaction.value)}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}

      {isEditTransactionDialogOpen && (
        <EditTransactionDialog
          open={isEditTransactionDialogOpen}
          onClose={handleCloseEditTransactionDialog}
          transaction={transactionBeingEdited!}
          accounts={accounts}
        />
      )}
    </div>
  );
}
