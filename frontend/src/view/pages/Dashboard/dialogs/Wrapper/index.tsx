import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { EditAccountDialog } from "../EditAccountDialog";
import { NewAccountDialog } from "../NewAccountDialog";
import { NewTransactionDialog } from "../NewTransactionDialog";

export function DialogsWrapper() {
  const { accountBeingEdited } = useDashboard();
  console.log(accountBeingEdited)

  return (
    <>
      <NewTransactionDialog />
      <NewAccountDialog />
      {accountBeingEdited ? <EditAccountDialog /> : null}
    </>
  );
} 