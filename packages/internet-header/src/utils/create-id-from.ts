export function createIdFrom(str: string): string {
  const trimmed = str.trim();

  if (trimmed === '') {
    throw new Error('createIdFrom: input string cannot be empty or whitespace only.');
  }

  const baseId = trimmed.toLowerCase().replace(/\s+/g, '-');

  let i = 0;
  let id = baseId;

  while (document.getElementById(id)) {
    id = `${baseId}-${++i}`;
  }

  return id;
}
