import type { KlpEnvironment } from './klp-widget.model';

/**
 * Absorbed from internet-header's `config/klp-urls.ts`. The widget owns this table now; the
 * header stops shipping its own copy once it delegates the session.
 *
 * KLP also runs dev1, dev2, ds1 (our devs1) and test platforms, but their hosts are either internal
 * only or do not serve the session to pages, so those four environments use the int01 instance.
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
