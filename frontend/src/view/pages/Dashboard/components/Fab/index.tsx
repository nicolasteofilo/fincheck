import { PlusIcon } from "@radix-ui/react-icons";
import { Dropdown } from "../../../../components/Dropdown";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

export function Fab() {
  const { openNewAccountDialog, openNewTransactionDialog } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button className="bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white z-[99]">
            <PlusIcon className="w-6 h-6" />
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content className="mr-2 mb-2">
          <Dropdown.Item
            className="gap-4"
            onSelect={() => openNewTransactionDialog("EXPENSE")}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </Dropdown.Item>
          <Dropdown.Item
            className="gap-4"
            onSelect={() => openNewTransactionDialog("INCOME")}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </Dropdown.Item>
          <Dropdown.Item className="gap-4" onSelect={openNewAccountDialog}>
            <BankAccountIcon />
            Nova Conta
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}
