/**
 * Initially copy'n'pasted from https://github.com/ai/nanoid/blob/main/non-secure/index.js, then adopted to our needs.
 *
 * Our custom implementation generates unique IDs for DOM elements efficiently without requiring cryptographic security (as nanoid).
 * It eliminates the nanoid package dependency (as well as the transistive `node:crypto` dependency in node environments), meeting all our requirements.
 * This approach optimizes performance and minimizes the codebase footprint.
 */

const ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export function nanoid(size = 21) {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  let id = '';

  for (let i = 0; i < size; i++) {
    id += ALPHABET[bytes[i] & 63];
  }

  return id;
}
