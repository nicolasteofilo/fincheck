import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Dropdown } from "../../../../components/Dropdown";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

type TransactionType = 'INCOME' | 'EXPENSE' | undefined;

interface TransactionsTypeDropdownProps {
  onSelect: (type: TransactionType) => void;
  selectedType: TransactionType;
}

const labelPerType = {
  'INCOME': 'Receitas',
  'EXPENSE': 'Despesas',
}

const iconPerType = {
  'INCOME': <IncomeIcon />,
  'EXPENSE': <ExpensesIcon />,
}

export function TransactionsTypeDropdown({ onSelect, selectedType }: TransactionsTypeDropdownProps) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <button className="flex gap-2 items-center">
          {selectedType ? iconPerType[selectedType] : <TransactionsIcon />}

          <span className="text-gray-800 text-sm tracking-[-0.5px] font-medium">
            {selectedType ? labelPerType[selectedType] : 'Transações'}
          </span>
          <ChevronUpIcon className="text-gray-900" />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content className="mt-2 w-[279px]">
        <Dropdown.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </Dropdown.Item>
        <Dropdown.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </Dropdown.Item>
        <Dropdown.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
