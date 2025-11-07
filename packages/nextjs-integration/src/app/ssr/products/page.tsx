'use client';

import dynamic from 'next/dynamic';

const CSRPage = dynamic(() => import('../page'), {
  ssr: false,
});

export default function ProductsPage() {
  return <CSRPage />;
}