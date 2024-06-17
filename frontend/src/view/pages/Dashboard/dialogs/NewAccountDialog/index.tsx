import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Dialog } from "../../../../components/Dialog";
import { Input } from "../../../../components/Input";
import { InputCurreny } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useNewAccountDialogController } from "./useNewAccountDialogController";

export function NewAccountDialog() {
  const { closeNewAccountDialog, isNewAccountDialogOpen } =
    useNewAccountDialogController();

  return (
    <Dialog
      title="Nova Conta"
      open={isNewAccountDialogOpen}
      onClose={closeNewAccountDialog}
    >
      <form className="mt-10">
        <div className="flex flex-col">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurreny className="w-full" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" name="name" placeholder="Nome da conta" />
          <Select
            placeholder="Tipo"
            options={[
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />
          <ColorsDropdownInput />
        </div>
      </form>
    </Dialog>
  );
}
