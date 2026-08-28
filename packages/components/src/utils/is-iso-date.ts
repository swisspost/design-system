export function isIsoDate(value: string): boolean {
  const ISO_REGEX = /^\d{1,4}-\d{2}-\d{2}$/;
  if (!ISO_REGEX.test(value)) return false;

  const valueParts = value.split('-');
  const normalizedValue = `${valueParts[0].padStart(4, '0')}-${valueParts[1]}-${valueParts[2]}`;
  const date = new Date(`${normalizedValue}T00:00`);
  if (Number.isNaN(date.getTime())) return false;

  // Roundtrip comparison to catch auto-corrected dates
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}` === value;
}
