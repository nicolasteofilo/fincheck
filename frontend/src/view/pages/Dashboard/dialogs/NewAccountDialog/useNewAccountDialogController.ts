import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { currenytStringToNumber } from "../../../../../utils/currenytStringToNumber";

const schema = z.object({
  name: z.string().min(1, "Nome da conta é obrigatório"),
  initialBalance: z.string().min(1, "Saldo inicial é obrigatório"),
  type: z.enum(["INVESTMENT", "CASH", "CHECKING"]),
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

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["bank-accounts", "create"],
    mutationFn: async (data: BankAccountParams) => {
      return bankAccountsService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currenytStringToNumber(data.initialBalance),
      });

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
