import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Dialog } from "../../../../../components/Dialog";
import { Button } from "../../../../../components/Button";
import { useFiltersDialog } from "./useFiltersDialog";
import { cn } from "../../../../../../utils/cn";

interface FiltersDialogProps {
  open: boolean;
  onClose(): void;
}

const mockedAccounts = [
  {
    id: "123",
    name: "Nubank",
  },
  {
    id: "345",
    name: "XP Investimentos",
  },
];

export function FiltersDialog({ open, onClose }: FiltersDialogProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccountId,
    selectedYear,
    handleChangeYear,
  } = useFiltersDialog();

  return (
    <Dialog open={open} onClose={onClose} title="Filtros">
      <div className="mt-10">
        <span className="text-gray-800 text-lg font-bold tracking-[-1px] focus:outline-none mt-2">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          {mockedAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccountId(account.id)}
              className={cn(
                "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                account.id === selectedBankAccountId && "!bg-gray-200"
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px] focus:outline-none mt-2">
          Ano
        </span>

        <div className="w-[210px] mt-2 flex items-center justify-between">
          <button className="w-12 h-12 flex items-center justify-center" onClick={() => handleChangeYear(-1)}>
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 items-center justify-center text-center">
            <span className="text-sm font-bold tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>
          <button className="w-12 h-12 flex items-center justify-center" onClick={() => handleChangeYear(1)}>
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button text="Aplicar Filtros" className="mt-10" />
    </Dialog>
  );
}
