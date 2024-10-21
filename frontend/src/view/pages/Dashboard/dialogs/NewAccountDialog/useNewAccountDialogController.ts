import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { CreateBankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.number().min(1, "Saldo inicial é obrigatório"),
  name: z.string().min(1, "Nome da Conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountDialogController() {
  const { isNewAccountDialogOpen, closeNewAccountDialog } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateBankAccountParams) => {
      return bankAccountsService.create({ ...data, type: data.type === "INVESTMENT" ? "INVESTIMENT" : data.type });
    },
  });

  const { invalidateBankAccounts } = useBankAccounts();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
      });

      invalidateBankAccounts();

      toast.success("Conta foi cadastrada com sucesso!");
      closeNewAccountDialog();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a conta!");
    }
  });

  const handleCloseNewAccountDialog = () => {
    closeNewAccountDialog();
    reset();
  };

  return {
    isNewAccountDialogOpen,
    closeNewAccountDialog: handleCloseNewAccountDialog,
    register,
    errors,
    handleSubmit,
    control,
    isLoading: isPending,
  };
}
