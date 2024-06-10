import { cn } from "../../../../../utils/cn";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";
import { Header } from "./Header";

export function Transactions() {
  const { areValuesVisible } = useDashboard();

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      <Header />

      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
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
      </div>
    </div>
  );
}
