import { BankAccount } from "../../../../../../app/entities/BankAccount";
import { cn } from "../../../../../../utils/cn";
import { formatCurrency } from "../../../../../../utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../../DashboardContext/useDashboard";

export function AccountCard({ name, color, currentBalance, type }: BankAccount) {
  const { areValuesVisible } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950 cursor-pointer"
      style={{
        borderColor: color
      }}
      role="button"
    >
      <div>
        <BankAccountTypeIcon type={type === 'INVESTMENT' ? 'INVESTIMENT' : type} />
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span className={cn("text-gray-800 font-medium tracking-[-0.5px] block", !areValuesVisible && "blur-sm")}>
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
