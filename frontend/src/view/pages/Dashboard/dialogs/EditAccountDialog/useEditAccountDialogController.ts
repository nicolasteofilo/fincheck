import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { currenytStringToNumber } from "../../../../../utils/currenytStringToNumber";

const schema = z.object({
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.string().min(1, "Saldo inicial é obrigatório"),
  type: z.enum(["INVESTIMENT", "CASH", "CHECKING"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountDialogController() {
  const { isEditAccountDialogOpen, closeEditAccountDialog } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: "0,00",
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
        initialBalance: currenytStringToNumber(data.initialBalance),
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
  };
}
