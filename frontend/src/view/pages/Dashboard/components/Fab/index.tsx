import { PlusIcon } from "@radix-ui/react-icons";
import { Dropdown } from "../../../../components/Dropdown";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";

export function Fab() {
  return (
    <div className="fixed right-4 bottom-4">
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button className="bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white">
            <PlusIcon className="w-6 h-6" />
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content className="mr-2 mb-2">
          <Dropdown.Item className="gap-4">
            <CategoryIcon type="expense" />
            Nova Despensa
          </Dropdown.Item>
          <Dropdown.Item className="gap-4">
            <CategoryIcon type="income" />
            Nova Receita
          </Dropdown.Item>
          <Dropdown.Item className="gap-4">
            <BankAccountIcon />
            Nova Conta
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}
