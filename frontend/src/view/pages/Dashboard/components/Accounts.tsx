import { useState } from "react";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { cn } from "../../../../utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export function Accounts() {
  const [eyeOpen, setEyeOpen] = useState(true);

  function toogleEye() {
    setEyeOpen((prev) => !prev);
  }

  return (
    <div className="bg-teal-900 rounded-2xl h-full w-full px-4 py-8 lg:p-10 text-white flex flex-col">
      <div className="flex flex-col">
        <span className="tracking-[-0.5px]">Saldo total</span>

        <div className="flex gap-2 items-center">
          <strong
            className={cn("text-2xl tracking-[-1px]", !eyeOpen && "blur-sm")}
          >
            R$ 1000,00
          </strong>
          <button onClick={toogleEye} className="h-12 w-12">
            <EyeIcon open={eyeOpen} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <strong className="tracking-[-1px] text-lg">Minhas contas</strong>
          <div className="flex items-center justify-center">
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:enabled:bg-black/10 transition-colors disabled:opacity-40">
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:enabled:bg-black/10 transition-colors disabled:opacity-40">
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
