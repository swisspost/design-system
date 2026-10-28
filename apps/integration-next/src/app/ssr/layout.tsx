import { headers } from 'next/headers';
import { KLP_INITIAL_STATE_HEADER } from '../klp-mock';
import { PageLayout } from './page-layout';

// Layouts get no search params, so `src/proxy.ts` reads `?klpmock` and passes the result on as a header.
export default async function Layout({ children }: { readonly children: React.ReactNode }) {
  const klpInitialState =
    (await headers()).get(KLP_INITIAL_STATE_HEADER) === 'authenticated'
      ? 'authenticated'
      : 'anonymous';

  return <PageLayout klpInitialState={klpInitialState}>{children}</PageLayout>;
}
