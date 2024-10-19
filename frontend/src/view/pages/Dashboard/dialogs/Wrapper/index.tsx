import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { EditAccountDialog } from "../EditAccountDialog";
import { NewAccountDialog } from "../NewAccountDialog";
import { NewTransactionDialog } from "../NewTransactionDialog";

export function DialogsWrapper() {
  const { accountBeingEdited } = useDashboard();

  return (
    <>
      <NewTransactionDialog />
      <NewAccountDialog />
      {accountBeingEdited ? <EditAccountDialog /> : null}
    </>
  );
} 