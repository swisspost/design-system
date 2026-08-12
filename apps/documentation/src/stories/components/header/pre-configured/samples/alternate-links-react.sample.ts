import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LANGUAGES = ['de', 'fr', 'it', 'en'];

export function useAlternateLinks() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pathWithoutLang = pathname.replace(/^\/(de|fr|it|en)/, '');

    for (const lang of LANGUAGES) {
      const link = document.querySelector<HTMLLinkElement>(`link[hreflang="${lang}"]`);
      if (link) link.href = `/${lang}${pathWithoutLang}`;
    }
  }, [pathname]);
}