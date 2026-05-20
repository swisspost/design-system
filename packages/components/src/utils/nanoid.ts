const ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export function nanoid(size = 21) {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  let id = '';

  for (let i = 0; i < size; i++) {
    id += ALPHABET[bytes[i] & 63];
  }

  return id;
}
