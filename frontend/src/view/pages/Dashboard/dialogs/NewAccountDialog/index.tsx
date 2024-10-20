import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Dialog } from "../../../../components/Dialog";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useNewAccountDialogController } from "./useNewAccountDialogController";

export function NewAccountDialog() {
  const { errors, handleSubmit, register, control, isLoading, closeNewAccountDialog, isNewAccountDialogOpen } =
    useNewAccountDialogController();

  return (
    <Dialog title="Nova Conta" open={isNewAccountDialogOpen} onClose={closeNewAccountDialog}>
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              render={({ field: { onChange } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={value => onChange(value)}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input type="text" placeholder="Nome da Conta" error={errors.name?.message} {...register("name")} />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: "CHECKING",
                    label: "Conta Corrente",
                  },
                  {
                    value: "INVESTMENT",
                    label: "Investimentos",
                  },
                  {
                    value: "CASH",
                    label: "Dinheiro Físico",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput error={errors.color?.message} onChange={onChange} value={value} />
            )}
          />
        </div>

        <Button text="Criar" type="submit" className="w-full mt-6" isLoading={isLoading} />
      </form>
    </Dialog>
  );
}
