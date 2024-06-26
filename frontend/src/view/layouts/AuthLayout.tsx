import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";

import ilustrationLogin from "../../assets/login.png";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex items-center justify-center flex-col lg:w-1/2">
        <Logo className="text-gray-500 h-6" />

        <div className="mt-16 w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div className="w-1/2 h-full p-8 justify-center items-center hidden lg:flex">
        <div className="flex flex-col">
          <img
            src={ilustrationLogin}
            className="object-cover w-full h-full max-w-[428px] max-h-[580px] rounded-[32px]"
          />
          <div className="max-w-[656px] h-auto p-10 bottom-8">
            <Logo className="text-teal-900 h-8" />
            <p className="text-gray-700 font-medium text-lg mt-6">
              Gerencie suas finanças pessoais de uma forma simples com o
              fincheck, e o melhor, totalmente de graça!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
