interface UserMenuProps {
  name: string;
}

export function UserMenu({ name }: UserMenuProps) {
  const [firstName, lastName] = name.split(" ");
  const fistWordOfFirstName = firstName?.charAt(0);
  const fistWordOflastName = lastName?.charAt(0);

  const userName = `${fistWordOfFirstName ? fistWordOfFirstName : ""}${
    fistWordOflastName ? fistWordOflastName : ""
  }`;

  return (
    <div className="cursor-pointer bg-teal-100 rounded-full w-12 h-12 flex justify-center items-center border border-teal-500">
      <span className="text-lg tracking-[-0.5px] font-medium text-teal-900 select-none">{userName}</span>
    </div>
  );
}
