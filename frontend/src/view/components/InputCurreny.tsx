import { NumericFormat } from "react-number-format";
import { cn } from "../../utils/cn";

interface InputCurrenyProps {
  className?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurreny({ className, onChange, value }: InputCurrenyProps) {
  return (
    <div>
      <NumericFormat
        className={cn(
          "text-gray-800 border-none text-[32px] font-bold tracking-[-1px] focus:outline-none",
          className
        )}
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={event => onChange?.(event.target.value)}
      />
    </div>
  );
}
