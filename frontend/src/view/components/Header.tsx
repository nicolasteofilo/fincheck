import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";

export function Header() {
  return (
    <header className="flex justify-between h-12 items-center">
        <Logo className="h-6 text-teal-900" />
        <UserMenu name="Nicolas" />
      </header>
  )
}