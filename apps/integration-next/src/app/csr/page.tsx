'use client';

import dynamic from 'next/dynamic';

const CSRLayout = dynamic(() => import('../ssr/layout'), {
  ssr: false,
});

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
