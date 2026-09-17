import type { KlpEnvironment } from './klp-widget.model';

/**
 * Absorbed from internet-header's `config/klp-urls.ts`. The widget owns this table now; the
 * header stops shipping its own copy once it delegates the session.
 *
 * dev01, dev02, devs1 and test have no platform of their own and share the int01 instance.
 */
export const KLP_BASE_URLS: Record<KlpEnvironment, string> = {
  dev01: 'https://n.accountint1.post.ch',
  dev02: 'https://n.accountint1.post.ch',
  devs1: 'https://n.accountint1.post.ch',
  test: 'https://n.accountint1.post.ch',
  int01: 'https://n.accountint1.post.ch',
  int02: 'https://n.accountint2.post.ch',
  prod: 'https://n.account.post.ch',
};

/** Returns null rather than defaulting, so a typo in the attribute cannot silently reach prod. */
export function klpBaseUrl(environment: string): string | null {
  return KLP_BASE_URLS[environment as KlpEnvironment] ?? null;
}
