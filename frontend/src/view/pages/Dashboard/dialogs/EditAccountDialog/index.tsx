import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { Dialog } from "../../../../components/Dialog";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { Input } from "../../../../components/Input";
import { InputCurreny } from "../../../../components/InputCurreny";
import { Select } from "../../../../components/Select";
import { useEditAccountDialogController } from "./useEditAccountDialogController";

export function EditAccountDialog() {
  const {
    isEditAccountDialogOpen,
    closeEditAccountDialog,
    errors,
    register,
    handleSubmit,
    control,
    isLoadingEdit,
    isLoadingRemove,
    toogleDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
  } = useEditAccountDialogController();

  return (
    <Dialog
      title="Editar Conta"
      open={isEditAccountDialogOpen}
      onClose={closeEditAccountDialog}
      rightAction={(
        <button onClick={toogleDeleteModal}><TrashIcon className="w-6 h-6 text-red-900" /></button>
      )}>

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={toogleDeleteModal}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao exluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        onConfirm={handleDeleteAccount}
        isLoading={isLoadingRemove}
      />

      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              render={({ field: { onChange, value } }) => (
                <InputCurreny className="w-full" onChange={onChange} value={value as number} />
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
                  { value: "INVESTIMENT", label: "Investimentos" },
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

          <Button text="Salvar" isLoading={isLoadingEdit} />
        </div>
      </form>
    </Dialog>
  );
}
