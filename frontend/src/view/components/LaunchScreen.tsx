import { Transition } from "@headlessui/react";
import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

interface LaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-3000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="z-50 bg-teal-900 fixed top-0 left-0 h-full w-full flex justify-center items-center flex-col">
        <Logo className="h-10 text-white transition-all mb-10" />
        <Spinner className="text-teal-900 fill-white" />
      </div>
    </Transition>
  );
}
