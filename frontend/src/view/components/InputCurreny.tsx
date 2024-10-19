import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../utils/cn";

interface InputCurrenyProps {
  className?: string;
  value?: string | number;
  onChange?(value: string): void;
  error?: string;
}

export function InputCurreny({ className, onChange, value, error }: InputCurrenyProps) {
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

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
