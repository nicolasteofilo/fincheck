import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { formatDate } from "../../utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({ error, className, value, onChange }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChange(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none",
              "relative text-left pt-4",
              error && "border-red-900 focus:border-red-900",
              className
            )}
          >
            <span className="text-gray-700 text-xs left-[13px] top-2 pointer-events-none absolute">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChange} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
