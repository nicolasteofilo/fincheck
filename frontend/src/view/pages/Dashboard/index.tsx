import { Header } from "../../components/Header";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";

export function Dashboard() {
  return (
    <div className="h-full w-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-4">
      <Header />

      <main className="flex-1 flex h-full w-full gap-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Accounts />
        </div>
        <div className="w-full lg:w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  );
}
