import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Dialog } from "../../../../../components/Dialog";
import { Button } from "../../../../../components/Button";

interface FiltersDialogProps {
  open: boolean;
  onClose(): void;
}

export function FiltersDialog({ open, onClose }: FiltersDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Filtros">
      <div className="mt-10">
        <span className="text-gray-800 text-lg font-bold tracking-[-1px] focus:outline-none mt-2">
          Conta
        </span>
        <div className="space-y-2 mt-2">
          <button className="p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors">
            XP Investimentos
          </button>
        </div>
      </div>
      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px] focus:outline-none mt-2">
          Ano
        </span>

        <div className="w-[210px] mt-2 flex items-center justify-between">
          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 items-center justify-center text-center">
            <span className="text-sm font-bold tracking-[-0.5px]">2024</span>
          </div>
          <button className="w-12 h-12 flex items-center justify-center">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button text="Aplicar Filtros" className="mt-10" />
    </Dialog>
  );
}
