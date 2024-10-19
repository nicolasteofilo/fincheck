import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { CreateBankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import { currenytStringToNumber } from "../../../../../utils/currenytStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.string().min(1, "Saldo inicial é obrigatório"),
  type: z.enum(["INVESTIMENT", "CASH", "CHECKING"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountDialogController() {
  const { isNewAccountDialogOpen, closeNewAccountDialog } = useDashboard();

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
    mutationFn: async (data: CreateBankAccountParams) => {
      return bankAccountsService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        type: data.type === 'INVESTIMENT' ? 'INVESTIMENT' : data.type,
        initialBalance: currenytStringToNumber(data.initialBalance) as number,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta cadastrada com sucesso!");
      reset();
      closeNewAccountDialog();
    } catch {
      toast.error("Erro ao criar sua conta, tente novamente!");
    }
  });

  return {
    isNewAccountDialogOpen,
    closeNewAccountDialog,
    errors,
    register,
    handleSubmit,
    control,
    isLoading: isPending,
  };
}
