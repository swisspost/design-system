const SUPPORTED_LANGUAGES = new Set(['de', 'fr', 'it', 'en']);

/**
 * Read alternate language links from <link rel="alternate" hreflang="..."> in <head>.
 * Only returns entries whose hreflang matches a supported language and whose href is a valid URL.
 */
export const getAlternateLinks = (): Map<string, string> => {
  const result = new Map<string, string>();
  const links = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="alternate"][hreflang]',
  );

  for (const link of links) {
    const lang = link.hreflang?.substring(0, 2).toLowerCase();
    if (!SUPPORTED_LANGUAGES.has(lang)) continue;
    if (result.has(lang)) continue;

    const href = link.getAttribute('href');
    if (!href) continue;

    try {
      const url = new URL(href, document.baseURI);
      result.set(lang, url.href);
    } catch {
      // Invalid URL, fall back to config
    }
  }

  return result;
};

/**
 * Observe <head> for changes to alternate links.
 * Fires the callback whenever a <link rel="alternate"> is added, removed,
 * or has its href/hreflang attribute changed.
 *
 * @returns A cleanup function that disconnects the observer.
 */
export const observeAlternateLinks = (
  callback: (links: Map<string, string>) => void,
): (() => void) => {
  const observer = new MutationObserver(mutations => {
    const isRelevant = mutations.some(m => {
      // Attribute change on a link[rel="alternate"]
      if (m.type === 'attributes' && m.target instanceof HTMLLinkElement) {
        return (
          (m.target.rel === 'alternate' && m.target.hasAttribute('hreflang')) ||
          m.attributeName === 'hreflang' ||
          m.attributeName === 'rel'
        );
      }

      if (m.type === 'childList') {
        const nodes = [...m.addedNodes, ...m.removedNodes];
        return nodes.some(
          n =>
            n instanceof HTMLLinkElement &&
            n.rel === 'alternate' &&
            n.hasAttribute('hreflang'),
        );
      }

      return false;
    });

    if (isRelevant) {
      callback(getAlternateLinks());
    }
  });

  observer.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href', 'hreflang', 'rel'],
  });

  return () => observer.disconnect();
};
