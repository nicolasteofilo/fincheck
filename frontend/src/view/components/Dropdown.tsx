import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../utils/cn";

interface DropdownRootProps {
  children: React.ReactNode;
  onOpenChange?(isOpen: boolean): void;
}

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}

interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
}

function DropdownRoot({ children, onOpenChange }: DropdownRootProps) {
  return (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
      {children}
    </DropdownMenu.Root>
  );
}

function DropdownTrigger({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Trigger className="outline-none">
      {children}
    </DropdownMenu.Trigger>
  );
}

function DropdownContent({ children, className }: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={cn(
          "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className
        )}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

function DropdownItem({ children, className, onSelect }: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "outline-none cursor-pointer min-h-[40px] flex items-center px-4 text-gray-700 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors",
        className
      )}
    >
      {children}
    </DropdownMenu.Item>
  );
}

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};
