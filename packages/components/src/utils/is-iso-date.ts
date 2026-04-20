export function isIsoDate(value: string): boolean {
  const ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;
  if (!ISO_REGEX.test(value)) return false;

  const date = new Date(value); // strict UTC parsing
  if (Number.isNaN(date.getTime())) return false;

  // Roundtrip comparison to catch auto-corrected dates
  // Use UTC getters to match the UTC parsing above - no timezone shift
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');

  return `${y}-${m}-${d}` === value;
}
