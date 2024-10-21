import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { RemoveBankAccountParams } from "../../../../../app/services/bankAccountsService/remove";
import { UpdateBankAccountParams } from "../../../../../app/services/bankAccountsService/update";
import { currencyStringToNumber } from "../../../../../utils/currenytStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.union([z.string().min(1, "Saldo inicial é obrigatório"), z.number()]),
  type: z.enum(["INVESTIMENT", "CASH", "CHECKING"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountDialogController() {
  const { isEditAccountDialogOpen, closeEditAccountDialog, accountBeingEdited } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      initialBalance: currencyStringToNumber(accountBeingEdited!.initialBalance),
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isPending: isPendingEdit, mutateAsync: updateAccount } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountsService.update(data);
    },
  });

  const { isPending: isPendingRemove, mutateAsync: removeAccount } = useMutation({
    mutationFn: async (data: RemoveBankAccountParams) => {
      return bankAccountsService.remove(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        type: data.type === "INVESTIMENT" ? "INVESTMENT" : data.type,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta editada com sucesso!");
      reset();
      closeEditAccountDialog();
    } catch {
      toast.error("Erro ao editar a conta, tente novamente!");
      closeEditAccountDialog();
    }
  });

  function toogleDeleteModal() {
    setIsDeleteModalOpen((prevState) => !prevState);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount({ id: accountBeingEdited!.id });
      toogleDeleteModal();
      closeEditAccountDialog();
      toast.success("Conta deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    } catch (error) {
      toast.error("Erro ao excluir a conta, tente novamente!");
      closeEditAccountDialog();
    }
  }

  return {
    isEditAccountDialogOpen,
    closeEditAccountDialog,
    errors,
    register,
    handleSubmit,
    control,
    isLoadingEdit: isPendingEdit,
    isLoadingRemove: isPendingRemove,
    accountBeingEdited,
    isDeleteModalOpen,
    toogleDeleteModal,
    handleDeleteAccount,
  };
}
