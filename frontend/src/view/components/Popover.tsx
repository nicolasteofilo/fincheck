import * as RdxPopover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";

interface PopoverRootProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

function PopoverRoot({ children }: PopoverRootProps) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverTrigger({ children }: PopoverTriggerProps) {
  return (
    <RdxPopover.Trigger className="outline-none z-[99]" asChild>
      {children}
    </RdxPopover.Trigger>
  );
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Content
      className={cn(
        "outline-none p-4",
        "rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]",
        "data-[side=bottom]:animate-slide-up-and-fade",
        "data-[side=top]:animate-slide-down-and-fade",
        className
      )}
    >
      {children}
    </RdxPopover.Content>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
