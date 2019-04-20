export const intDivision = (divisor: number) => (divident: number) =>
  Math.floor(divident / divisor);

export const intHalf = intDivision(2);
