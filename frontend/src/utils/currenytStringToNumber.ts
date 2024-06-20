export function currenytStringToNumber(value: string): number {
  return Number(value.replace(/\./g, "").replace(/,/g, "."));
}
