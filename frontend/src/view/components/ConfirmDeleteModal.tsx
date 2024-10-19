import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  description?: string
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function ConfirmDeleteModal({ open, onClose, title, description, onConfirm, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} title="Excluir" onClose={onClose}>
      <div className="flex flex-col w-full items-center text-center justify-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="font-bold w-[200px] text-gray-800 tracking-[-0.5px]">{title}</p>
        <p className="font-light tracking-[-0.5px] text-gray-800">{description}</p>

        <div className="flex flex-col mt-10 w-full gap-4">
          <Button
            text="Sim, desejo exluir"
            className="w-full"
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            classNameSpiner="fill-red-900"
          />
          <Button text="Cancelar" className="w-full" variant="ghost" onClick={onClose} disabled={isLoading} />
        </div>
      </div>
    </Dialog>
  )
}