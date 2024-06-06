import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ComponentProps<"button"> {
  text: string;
}

export function Button({ text, className, ...props }: ButtonProps) {
  return (
    <div>
      <button
        {...props}
        className={cn(
          "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed w-full px-6 h-12 rounded-2xl text-white font-medium transition-all",
          className
        )}
      >
        {text}
      </button>
    </div>
  );
}
