'use client';

import dynamic from 'next/dynamic';
import { getKlpInitialState } from '../klp-mock';

// Only ever rendered in the browser, so the URL can be read directly.
const CSRLayout = dynamic(
  async () => {
    const { PageLayout } = await import('../ssr/page-layout');

    return function CSRLayout({ children }: { readonly children: React.ReactNode }) {
      const klpInitialState = getKlpInitialState(new URLSearchParams(location.search));

      return <PageLayout klpInitialState={klpInitialState}>{children}</PageLayout>;
    };
  },
  {
    ssr: false,
  },
);

const CSRPage = dynamic(() => import('../ssr/page'), {
  ssr: false,
});

export default function Home() {
  return (
    <CSRLayout>
      <CSRPage />
    </CSRLayout>
  );
}
