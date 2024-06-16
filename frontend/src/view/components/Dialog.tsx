import * as RdxDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DialogProps {
  className?: string;
  open: boolean;
  children: React.ReactNode;
  title: string;
  rightAction?: React.ReactNode;
  onClose?(): void;
}

export function Dialog({ className, children, open, title, rightAction, onClose }: DialogProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlay-show"
          )}
        />
        <RdxDialog.Content
          className={cn(
            "z-[51] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none p-6 space-10 bg-white rounded-2xl w-full max-w-[400px]",
            "data-[state=open]:animate-content-show",
            "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
            className
          )}
        >
          <header className="h-12 w-full flex items-center justify-between text-gray-800 focus:outline-none">
            <button className="w-12 h-12 flex items-center justify-center outline-none focus:outline-none" onClick={onClose}>
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span className="text-lg font-bold tracking-[-1px] focus:outline-none">{title}</span>

            <div className="w-12 h-12 flex items-center justify-center focus:outline-none">{rightAction}</div>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
