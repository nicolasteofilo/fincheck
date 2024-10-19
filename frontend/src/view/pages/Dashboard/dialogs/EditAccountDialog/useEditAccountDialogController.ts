import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { BankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import { currenytStringToNumber } from "../../../../../utils/currenytStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.union([
    z.string().min(1, "Saldo inicial é obrigatório"),
    z.number(),
    z.null(),
    z.undefined(),
  ]),
  type: z.enum(["INVESTIMENT", "CASH", "CHECKING"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountDialogController() {
  const { isEditAccountDialogOpen, closeEditAccountDialog, accountBeingEdited } = useDashboard();

  console.log(accountBeingEdited?.initialBalance)

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
      initialBalance: (currenytStringToNumber(accountBeingEdited?.initialBalance) as unknown as string)
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: BankAccountParams) => {
      return bankAccountsService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        type: data.type === "INVESTIMENT" ? "INVESTMENT" : data.type,
        initialBalance: currenytStringToNumber(data.initialBalance) as number,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta editada com sucesso!");
      reset();
      closeEditAccountDialog();
    } catch {
      toast.error("Erro ao editar sua conta, tente novamente!");
    }
  });

  return {
    isEditAccountDialogOpen,
    closeEditAccountDialog,
    errors,
    register,
    handleSubmit,
    control,
    isLoading: isPending,
    accountBeingEdited,
  };
}
