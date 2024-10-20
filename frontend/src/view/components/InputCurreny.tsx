import { CrossCircledIcon } from "@radix-ui/react-icons";

import { cn } from "../../utils/cn.ts";
import { InputCurrency as InputCurrencyLib } from "./CurrencyInput/index.tsx";

interface InputCurrencyProps {
  error?: string;
  value?: number;
  onChange?(value: number): void;
  name?: string;
}

export function InputCurrency({ error, onChange, value, name }: InputCurrencyProps) {
  return (
    <div>
      <InputCurrencyLib
        className={cn("text-gray-800 text-[32px] font-bold tracking-[0.5px] outline-none w-full")}
        onChange={(value) => onChange ? onChange(value) : null}
        value={value}
        name={name}
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
