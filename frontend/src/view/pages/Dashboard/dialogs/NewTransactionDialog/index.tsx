import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Dialog } from "../../../../components/Dialog";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useNewTransactionDialog } from "./useNewTransactionDialogController";

const dialogTitleByType = {
  INCOME: "Nova Receita",
  EXPENSE: "Nova Despesa",
};

const inputPlaceholderByType = {
  INCOME: "Nome da Receita",
  EXPENSE: "Nome da Despesa",
};

const receiveOrPayByType = {
  INCOME: "Receber com",
  EXPENSE: "Pagar com",
};

export function NewTransactionDialog() {
  const {
    isNewTransactionDialogOpen,
    closeNewTransactionDialog,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
  } = useNewTransactionDialog();

  return (
    <Dialog
      title={dialogTitleByType[newTransactionType]}
      open={isNewTransactionDialogOpen}
      onClose={closeNewTransactionDialog}
    >
      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange } }) => (
                <InputCurrency onChange={onChange} error={errors.value?.message} />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={inputPlaceholderByType[newTransactionType]}
            {...register("name")}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                placeholder="Categoria"
                options={categories.map((category) => ({ value: category.id, label: category.name }))}
              />
            )}
          />

          <Controller
            control={control}
            defaultValue=""
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
                placeholder={receiveOrPayByType[newTransactionType]}
                options={accounts.map((account) => ({ value: account.id, label: account.name }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput value={value} onChange={onChange} error={errors.date?.message} />
            )}
          />
          <Button text="Salvar" type="submit" isLoading={isLoading} />
        </div>
      </form>
    </Dialog>
  );
}
