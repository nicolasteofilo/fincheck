import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "../../../app/services/authService";
import { SigninParams } from "../../../app/services/authService/signin";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z
    .string()
    .email("Infome um e-mail válido")
    .min(1, "E-mail é obrigatório"),
  password: z.string().min(8, "A senha deve conter pelo menos 8 digítos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["sigin"],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { access_token } = await mutateAsync(data);
      signin(access_token);
    } catch (error) {
      toast.error("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
