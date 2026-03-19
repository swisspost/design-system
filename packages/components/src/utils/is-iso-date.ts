export function isIsoDate(value: string): boolean {
  const ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;

  if (!ISO_REGEX.test(value)) return false;

  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);

  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}
