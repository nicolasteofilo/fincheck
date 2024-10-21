import { Controller } from "react-hook-form";
import { BankAccount } from "../../../../../app/entities/BankAccount";
import { Transaction } from "../../../../../app/entities/Transaction";
import { Button } from "../../../../components/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Dialog } from "../../../../components/Dialog";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useEditTransactionDialog } from "./useEditTransactionDialog";

const dialogTitleByType = {
  INCOME: "Editar Receita",
  EXPENSE: "Editar Despesa",
};

const inputPlaceholderByType = {
  INCOME: "Nome da Receita",
  EXPENSE: "Nome da Despesa",
};

const receiveOrPayByType = {
  INCOME: "Receber com",
  EXPENSE: "Pagar com",
};

interface EditTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
  accounts: BankAccount[];
}

export function EditTransactionDialog({ open, onClose, transaction, accounts }: EditTransactionDialogProps) {
  const {
    control,
    errors,
    handleSubmit,
    register,
    categories,
    isLoading,
    toogleDeleteModal,
    isDeleteModalOpen,
    isLoadingRemove,
    handleDeleteTransaction,
  } = useEditTransactionDialog({
    transaction,
    accounts,
    onClose,
  });

  return (
    <Dialog
      title={dialogTitleByType["EXPENSE"]}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={toogleDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={toogleDeleteModal}
        title="Tem certeza que deseja excluir esta transação?"
        description="Ao exluir esta transação, a ação não poderá ser desfeita."
        onConfirm={handleDeleteTransaction}
        isLoading={isLoadingRemove}
      />

      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <InputCurrency onChange={onChange} value={value} error={errors.value?.message} />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={inputPlaceholderByType["EXPENSE"]}
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
                placeholder={receiveOrPayByType["EXPENSE"]}
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
