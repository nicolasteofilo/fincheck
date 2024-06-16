import { cn } from "../../../../../utils/cn";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";
import { Header } from "./Header";
import { useTransactionsController } from "./useTransactionsController";
import emptyStateIlustration from "../../../../../assets/empty-state.svg";
import { FiltersDialog } from "./FiltersDialog/index.tsx";

export function Transactions() {
  const {
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersDialogOpen,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
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
          <FiltersDialog open={isFiltersDialogOpen} onClose={handleCloseFiltersDialog} />
          <Header handleOpenFiltersDialog={handleOpenFiltersDialog} />

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {(!hasTransactions || isLoading) && (
              <div className="w-full h-full flex items-center justify-center flex-col">
                {isLoading && <Spinner className="w-10 h-10" />}

                {!hasTransactions && !isLoading && (
                  <>
                    <img
                      src={emptyStateIlustration}
                      alt="Nenhuma transação encontrada"
                    />
                    <p className="text-gray-700 mt-4">
                      Não encontramos nenhuma transação!
                    </p>
                  </>
                )}
              </div>
            )}

            {hasTransactions && !isLoading && (
              <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-3">
                  <CategoryIcon type="expense" />
                  <div>
                    <strong className="text-gray-800 font-bold tracking-[-0.5px] block">
                      Almoço
                    </strong>
                    <span className="text-sm text-gray-600">04/06/2023</span>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-red-800 tracking-[-0.5px] font-medium",
                    !areValuesVisible && "blur-sm"
                  )}
                >
                  -{formatCurrency(1000.0)}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
