import type { RequestInfo, RequestInit, Response } from 'node-fetch';

/** Loads node-fetch v3's ESM export for the CommonJS tooling package. */
export async function fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
  const { default: nodeFetch } = await import('node-fetch');
  return nodeFetch(url, init);
}
