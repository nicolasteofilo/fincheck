import { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  text: string;
  isLoading?: boolean;
}

export function Button({ text, className, isLoading, disabled, ...props }: ButtonProps) {
  return (
    <div>
      <button
        {...props}
        className={cn(
          "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed w-full px-6 h-12 rounded-2xl text-white font-medium transition-all flex justify-center items-center",
          className
        )}
        disabled={disabled || isLoading}
      >
        {isLoading ? <Spinner /> : text}
      </button>
    </div>
  );
}
