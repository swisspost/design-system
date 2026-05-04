export function createIdFrom(str: string): string {
  const baseId = str.trim().toLowerCase().replace(/\s+/g, '-');

  let i = 0;
  let id = baseId;

  while (document.getElementById(id)) {
    id = `${baseId}-${++i}`;
  }

  return id;
}
