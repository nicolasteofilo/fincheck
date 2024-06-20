import * as RdxSelect from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../utils/cn";
import { useState } from "react";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?(value: string): void;
  value?: string;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  function handleSelectValue(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          htmlFor=""
          className={cn(
            "absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
            (selectedValue || value) && "text-xs left-[13px] top-3.5 transition-all"
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root
          onValueChange={(value) => handleSelectValue(value)}
          value={value}
        >
          <RdxSelect.Trigger
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none flex justify-between items-center pt-4",
              error && "border-red-900 focus:border-red-900",
              className
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="h-full absolute right-3 top-4">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content
              className={cn(
                "overflow-hidden bg-white z-[99] rounded-2xl border border-gray-100"
              )}
            >
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-4">
                {options.map((option) => (
                  <RdxSelect.Item
                    value={option.value}
                    key={option.value}
                    className="p-2 text-gray-800 text-sm cursor-pointer data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RdxSelect.ItemText>
                      {option.label}
                    </RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
