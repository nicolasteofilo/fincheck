import { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  text: string;
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
  classNameSpiner?: string;
}

export function Button({ text, className, isLoading, disabled, variant, classNameSpiner, ...props }: ButtonProps) {
  const isDanger = variant === 'danger';
  const isGhost = variant === 'ghost';

  return (
    <div>
      <button
        {...props}
        className={cn(
          "bg-teal-900 hover:bg-teal-80 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed w-full px-6 h-12 rounded-2xl text-white font-medium transition-all flex justify-center items-center",
          isDanger && 'bg-red-900 hover:bg-red-800',
          isGhost && 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5',
          className
        )}
        disabled={disabled || isLoading}
      >
        {isLoading ? <Spinner className={classNameSpiner} /> : text}
      </button>
    </div>
  );
}
