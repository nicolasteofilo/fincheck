import { cn } from "../../../../../utils/cn";
import { formatCurrency } from "../../../../../utils/formatCurrency";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

export function Balance({ currentBalance }: { currentBalance: number }) {
  const { areValuesVisible, toogleValuesVasibility } = useDashboard();

  return (
    <div className="flex flex-col">
      <span className="tracking-[-0.5px] select-none">Saldo total</span>

      <div className="flex gap-2 items-center">
        <strong
          className={cn(
            "text-2xl tracking-[-1px]",
            !areValuesVisible && "blur-sm"
          )}
        >
          {formatCurrency(currentBalance)}
        </strong>
        <button onClick={() => toogleValuesVasibility()} className="h-12 w-12">
          <EyeIcon open={areValuesVisible} />
        </button>
      </div>
    </div>
  );
}
