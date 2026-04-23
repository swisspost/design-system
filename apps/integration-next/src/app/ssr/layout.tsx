import {
  PostBackToTop,
  PostBreadcrumbItem,
  PostBreadcrumbs,
} from '@swisspost/design-system-components-react/server';
export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {/* WARNING: Header not found in markup-map.json */}
      <main style={{ paddingBlock: '3rem' }}>
        <div
          className="container"
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <PostBreadcrumbs
            homeUrl="/"
            text-home="Home"
            text-breadcrumbs="Breadcrumbs"
            text-more-items="More items"
          >
            <PostBreadcrumbItem url="/section1">Section 1</PostBreadcrumbItem>
            <PostBreadcrumbItem url="/section2">Section 2</PostBreadcrumbItem>
            <PostBreadcrumbItem url="/section3">Section 3</PostBreadcrumbItem>
          </PostBreadcrumbs>
          {children}
        </div>
      </main>
      {/* WARNING: Footer not found in markup-map.json */}
      <PostBackToTop textBackToTop="Back to top" />
    </>
  );
}
