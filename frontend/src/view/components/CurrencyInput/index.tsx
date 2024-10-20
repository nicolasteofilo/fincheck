import { useState } from "react";
import { currencyStringToNumber } from "../../../utils/currenytStringToNumber";
import CurrencyInput, { CurrencyInputProps } from "./index";

const options: ReadonlyArray<CurrencyInputProps["intlConfig"]> = [
  {
    locale: "pt-BR",
    currency: "BRL",
  },
];

interface InputCurrencyProps {
  className?: string;
  name?: string;
  id?: string;
  onChange?: (newValue: number) => void;
  value?: number;
}

export function InputCurrency({ className, id, name, onChange, value }: InputCurrencyProps) {
  const [intlConfig] = useState<CurrencyInputProps["intlConfig"]>(options[0]);

  const handleOnValueChange: CurrencyInputProps["onValueChange"] = (value) => {
    const toNumber = currencyStringToNumber(value as string) || 0;
    if(onChange) onChange(toNumber);
  };

  return (
    <div>
      <CurrencyInput
        id={id}
        name={name}
        intlConfig={intlConfig}
        className={className}
        onValueChange={handleOnValueChange}
        decimalsLimit={6}
        value={value}
        step={1}
        placeholder="0,00"
      />
    </div>
  );
}
