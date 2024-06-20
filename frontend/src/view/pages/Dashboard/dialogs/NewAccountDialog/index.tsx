import { CrossCircledIcon } from "@radix-ui/react-icons";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Dialog } from "../../../../components/Dialog";
import { Input } from "../../../../components/Input";
import { InputCurreny } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useNewAccountDialogController } from "./useNewAccountDialogController";
import { Button } from "../../../../components/Button";
import { Controller } from "react-hook-form";

export function NewAccountDialog() {
  const {
    closeNewAccountDialog,
    isNewAccountDialogOpen,
    errors,
    register,
    handleSubmit,
    control,
    isLoading,
  } = useNewAccountDialogController();

  return (
    <Dialog
      title="Nova Conta"
      open={isNewAccountDialogOpen}
      onClose={closeNewAccountDialog}
    >
      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              render={({ field: { onChange, value } }) => (
                <InputCurreny
                  className="w-full"
                  onChange={onChange}
                  value={value}
                />
              )}
              name="initialBalance"
              control={control}
            />
          </div>
          {errors?.initialBalance?.message && (
            <div className="flex items-center gap-2 mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs">{errors?.initialBalance?.message}</span>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            defaultValue=""
            placeholder="Nome da conta"
            error={errors?.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                options={[
                  { value: "CHECKING", label: "Conta Corrente" },
                  { value: "INVESTMENT", label: "Investimentos" },
                  { value: "CASH", label: "Dinheiro Físico" },
                ]}
                error={errors?.type?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <ColorsDropdownInput error={errors?.color?.message} value={value} onChange={onChange} />
            )}
          />

          <Button text="Criar" isLoading={isLoading} />
        </div>
      </form>
    </Dialog>
  );
}
