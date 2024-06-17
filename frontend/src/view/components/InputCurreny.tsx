import { NumericFormat } from "react-number-format";
import { cn } from "../../utils/cn";

interface InputCurrenyProps {
  className?: string;
}

export function InputCurreny({ className }: InputCurrenyProps) {
  return (
    <NumericFormat
      className={cn(
        "text-gray-800 border-none text-[32px] font-bold tracking-[-1px] focus:outline-none",
        className
      )}
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0,00"
    />
  );
}
