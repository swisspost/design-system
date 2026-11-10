import { fetch as undiciFetch } from 'undici';

export function fetch(
  input: Parameters<typeof undiciFetch>[0],
  init?: Parameters<typeof undiciFetch>[1],
) {
  return undiciFetch(input, init);
}
