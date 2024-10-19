import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { queryClient } from "../../../../../App";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { CreateTransactionParams } from "../../../../../app/services/transactionsService/create";
import { currenytStringToNumber } from "../../../../../utils/currenytStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  value: z.union([z.string().min(1, "Informe o valor"), z.number()]),
  name: z
    .string({
      message: "Informe o nome",
    })
    .min(1, "Informe o nome"),
  categoryId: z.string({ message: "Informe a categoria" }).min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Informe a conta"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionDialog() {
  const { isNewTransactionDialogOpen, closeNewTransactionDialog, newTransactionType } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "0,00",
      date: new Date(),
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return transactionsService.create(data);
    },
  });
  
  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const newData = { ...data, type: newTransactionType, value: currenytStringToNumber(data.value) || 0 };
      await mutateAsync({ ...newData });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transação cadastrada com sucesso!");
      reset();
      closeNewTransactionDialog();
    } catch (error) {
      toast.error("Erro ao criar a transação, tente novamente!");
    }
  });


  function onClose() {
    closeNewTransactionDialog();
    reset();
  }

  return {
    isNewTransactionDialogOpen,
    closeNewTransactionDialog: onClose,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: isPending,
  };
}
