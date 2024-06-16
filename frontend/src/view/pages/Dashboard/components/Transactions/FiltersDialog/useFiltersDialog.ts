import { useState } from "react";

export function useFiltersDialog() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    null | string
  >(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  function handleSelectBankAccountId(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? null : bankAccountId
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }


  return {
    selectedBankAccountId,
    selectedYear,
    handleSelectBankAccountId,
    handleChangeYear,
  };
}
