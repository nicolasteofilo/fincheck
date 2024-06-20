import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Dialog } from "../../../../components/Dialog";
import { Input } from "../../../../components/Input";
import { InputCurreny } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useNewTransactionDialog } from "./useNewTransactionDialogController";

const dialogTitleByType = {
  INCOME: "Nova Receita",
  EXPENSE: "Nova Despesa",
};

const inputPlaceholderByType = {
  INCOME: "Nome da Receita",
  EXPENSE: "Nome da Despesa"
}

const receiveOrPayByType = {
  INCOME: "Receber com",
  EXPENSE: "Pagar com"
}

export function NewTransactionDialog() {
  const {
    isNewTransactionDialogOpen,
    closeNewTransactionDialog,
    newTransactionType,
  } = useNewTransactionDialog();

  return (
    <Dialog
      title={dialogTitleByType[newTransactionType]}
      open={isNewTransactionDialogOpen}
      onClose={closeNewTransactionDialog}
    >
      <form className="mt-10">
        <div className="flex flex-col">
        <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurreny className="w-full" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder={inputPlaceholderByType[newTransactionType]} />
          <Select placeholder="Categoria" options={[]} />
          <Select placeholder={receiveOrPayByType[newTransactionType]} options={[]} />
          <DatePickerInput />
          <Button text="Salvar" />
        </div>
      </form>
    </Dialog>
  );
}
