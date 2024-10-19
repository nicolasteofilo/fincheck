export function currenytStringToNumber(value: string | number | null | undefined): number | void {
  if (typeof value === 'number') return value;

  if(typeof value ===  'number' || typeof value ===  'string') {
    return Number(value.replace(/\./g, "").replace(/,/g, "."));
  }
}
