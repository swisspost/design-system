import {  } from '@swisspost/design-system-components-react/server';
export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {/* WARNING: Header not found in markup-map.json */}
      <main style={{ paddingBlock: '3rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* WARNING: Breadcrumbs not found in markup-map.json */}
          {children}
        </div>
      </main>
      {/* WARNING: Footer not found in markup-map.json */}
      {/* WARNING: BackToTop not found in markup-map.json */}
    </>
  );
}