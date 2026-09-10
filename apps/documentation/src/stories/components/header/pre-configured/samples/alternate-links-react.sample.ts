import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useAlternateLinks() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always update related <link rel="alternate" hreflang="..." href="..."> elements, after every route change.
    // You can use the header config, to find the language codes applied to the header switch, if needed.
  }, [pathname]);
}
