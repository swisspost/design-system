'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PostTabs, PostTabItem } from '@swisspost/design-system-components-react';
import { useEffect, useRef } from 'react';

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const tabsRef = useRef<HTMLPostTabsElement>(null);

  // Map pathname to tab name
  const getActiveTab = () => {
    if (pathname === '/ssr/products') return 'products';
    if (pathname === '/ssr/contact') return 'contact';
    return 'home';
  };

  // Update activeTab when route changes
  useEffect(() => {
    const activeTab = getActiveTab();
    if (tabsRef.current) {
      tabsRef.current.setAttribute('active-tab', activeTab);
    }
  }, [pathname]);


  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Navigation Tabs Test</h1>
      <p>Testing navigation mode with Next.js routing</p>

      <PostTabs 
        ref={tabsRef}
        activeTab={getActiveTab()} 
        label="Page navigation"
      >
        <PostTabItem name="home">
          <a 
            href="/ssr" 
            onClick={(e) => {
              e.preventDefault();
              router.push('/ssr');
            }}
          >
            Home
          </a>
        </PostTabItem>
        <PostTabItem name="products">
          <a 
            href="/ssr/products"
            onClick={(e) => {
              e.preventDefault();
              router.push('/ssr/products');
            }}
          >
            Products
          </a>
        </PostTabItem>
        <PostTabItem name="contact">
          <a 
            href="/ssr/contact"
            onClick={(e) => {
              e.preventDefault();
              router.push('/ssr/contact');
            }}
          >
            Contact
          </a>
        </PostTabItem>
      </PostTabs>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#e3f2fd', 
        borderRadius: '4px' 
      }}>
        <p><strong>Current Route:</strong> {pathname}</p>
        <p><strong>Active Tab:</strong> {getActiveTab()}</p>
      </div>

      {/* Page Content */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '2rem', 
        background: '#f5f5f5',
        borderRadius: '4px'
      }}>
        {pathname === '/ssr' && (
          <>
            <h2>Home Page</h2>
            <p>Welcome to the home page. This is the default view.</p>
          </>
        )}
        
        {pathname === '/ssr/products' && (
          <>
            <h2>Products Page</h2>
            <p>Browse our product catalog here.</p>
            <ul>
              <li>Product A</li>
              <li>Product B</li>
              <li>Product C</li>
            </ul>
          </>
        )}
        
        {pathname === '/ssr/contact' && (
          <>
            <h2>Contact Page</h2>
            <p>Get in touch with us.</p>
            <form style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Name: <input type="text" style={{ marginLeft: '0.5rem' }} /></label>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email: <input type="email" style={{ marginLeft: '0.5rem' }} /></label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>

      {/* Debug/Test Section */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#fff3cd',
        borderRadius: '4px'
      }}>
        <h3>Test Navigation</h3>
        <p>Use these buttons to test programmatic navigation:</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => router.push('/ssr')}
          >
            Go to Home
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => router.push('/ssr/products')}
          >
            Go to Products
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => router.push('/ssr/contact')}
          >
            Go to Contact
          </button>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          💡 Open browser console to see postChange events and aria-current updates
        </p>
      </div>
    </div>
  );
}