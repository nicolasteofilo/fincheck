import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  const { handleSubmit: hookFormHandleSubmit, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data)
  });

  return { handleSubmit, register, errors };
}