import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>
        <p className="space-x-1">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>{" "}
          <a
            className="text-teal-900 font-medium tracking-[-0.5px]"
            href="/login"
          >
            Fazer Login
          </a>
        </p>
      </header>

      <form className="flex flex-col mt-[60px] gap-4">
        <Input type="text" placeholder="Nome" name="name" />
        <Input type="email" placeholder="E-mail" name="email" />
        <Input type="password" placeholder="Senha" name="password" />
        <Button type="submit" text="Criar conta" />
      </form>
    </>
  );
}
