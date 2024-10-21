import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { BankAccount } from "../../../../../app/entities/BankAccount";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { UpdateTransactionParams } from "../../../../../app/services/transactionsService/update";
import { currencyStringToNumber } from "../../../../../utils/currenytStringToNumber";

const schema = z.object({
  value: z.number().min(1, "Valor é obrigatório"),
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

interface UseEditTransactionDialogProps {
  transaction: Transaction;
  accounts: BankAccount[];
  onClose: () => void;
}

export function useEditTransactionDialog({ transaction, accounts, onClose }: UseEditTransactionDialogProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(transaction.date),
      name: transaction.name,
      value: currencyStringToNumber(transaction.value),
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
    },
  });

  const { categories: categoriesList } = useCategories();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateTransactionParams) => {
      return transactionsService.update(data);
    },
  });

  const categories = useMemo(() => {
    return categoriesList?.filter((category) => category.type === transaction.type);
  }, [categoriesList, transaction.type]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const fomatedData = {
        ...data,
        type: transaction.type,
        value: data.value,
        id: transaction.id,
      };

      await mutateAsync({ ...fomatedData });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      if (data.value !== transaction.value) {
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      }
      onClose();
      toast.success("Transação editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar a transação, tente novamente!");
      onClose();
    }
  });

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: isPending,
  };
}