import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { TransactionsFilter } from "../../../../../../app/services/transactionsService/getAll";
import { cn } from "../../../../../../utils/cn";
import { Button } from "../../../../../components/Button";
import { Dialog } from "../../../../../components/Dialog";
import { useFiltersDialogController } from "./useFiltersDialogController";

interface FiltersDialogProps {
  open: boolean;
  onClose(): void;
  handleChangeFilters: <K extends keyof TransactionsFilter>(filterName: K, value: TransactionsFilter[K]) => void;
}

export function FiltersDialog({ open, onClose, handleChangeFilters }: FiltersDialogProps) {

  const { selectedBankAccountId, handleSelectBankAccountId, selectedYear, handleChangeYear } = useFiltersDialogController();
  const { accounts } = useBankAccounts();

  function onApplyChanges() {
    handleChangeFilters("bankAccountId", selectedBankAccountId!);
    handleChangeFilters("year", selectedYear!);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} title="Filtros">
      <div className="mt-10">
        <span className="text-gray-800 text-lg font-bold tracking-[-1px] focus:outline-none mt-2">Conta</span>
        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => {
                handleSelectBankAccountId(account.id);
              }}
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
        <span className="text-lg font-bold tracking-[-1px] focus:outline-none mt-2">Ano</span>

        <div className="w-[210px] mt-2 flex items-center justify-between">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => {
              handleChangeYear(-1);
            }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 items-center justify-center text-center">
            <span className="text-sm font-bold tracking-[-0.5px]">{selectedYear}</span>
          </div>
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => {
              handleChangeYear(1);
            }}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button text="Aplicar Filtros" className="mt-10" onClick={onApplyChanges} />
    </Dialog>
  );
}
