export function round (n: number, decimalPlaces: number) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(n * factorOfTen) / factorOfTen;
}
