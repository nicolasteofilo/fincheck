export function currencyStringToNumber(value: string | number) {
  if (value === undefined) return 0;

  if (typeof value === "number") {
    return value;
  }

  const sanitizedString = value.replace(/\./g, "").replace(",", ".");
  const toNumber = Number(sanitizedString);

  return toNumber;
}
