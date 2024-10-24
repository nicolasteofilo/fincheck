import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { CreateTransactionParams } from "../../../../../app/services/transactionsService/create";
import { currencyStringToNumber } from "../../../../../utils/currenytStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  value: z.number().min(0, "Valor é obrigatório").default(0),
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
      date: new Date(),
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTransactionParams) => {
      return transactionsService.create(data);
    },
  });

  const { accounts, invalidateBankAccounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList?.filter((category) => category.type === newTransactionType);
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const fomatedData = { ...data, type: newTransactionType, value: currencyStringToNumber(data.value) || 0 };
      await mutateAsync({ ...fomatedData });

      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      invalidateBankAccounts();
      onClose();
      toast.success("Transação cadastrada com sucesso!");
    } catch (error) {
      reset();
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
