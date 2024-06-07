import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z
    .string()
    .email("Infome um e-mail válido")
    .min(1, "E-mail é obrigatório"),
  password: z.string().min(8, "A senha deve conter pelo menos 8 digítos"),
  name: z.string().min(1, "O nome é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function useRegistorController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { access_token } = await mutateAsync(data);
      signin(access_token)
    } catch (error) {
      toast.error("Ocorreu um erro ao criar sua conta!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
