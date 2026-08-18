/**
 * Read alternate language links from <link rel="alternate" hreflang="..."> in <head>.
 * Only returns entries whose hreflang matches a supported language and whose href is a valid URL.
 */
export const getAlternateLinks = (): Map<string, string> => {
  const result = new Map<string, string>();
  const links = document.querySelectorAll<HTMLLinkElement>(
    'head link[rel="alternate"][hreflang][href]',
  );

  for (const link of links) {
    const href = link.getAttribute('href');
    if (!href) continue;

    const code = link.hreflang?.toLowerCase();
    if (result.has(code)) continue;

    try {
      const url = new URL(href, document.baseURI);
      result.set(code, url.href);
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
      if (m.type === 'attributes') {
        if (!(m.target instanceof HTMLLinkElement)) return false;

        return (
          m.attributeName === 'href' ||
          m.attributeName === 'hreflang' ||
          (m.attributeName === 'rel' && m.target.rel === 'alternate')
        );
      }

      if (m.type === 'childList') {
        return [...m.addedNodes, ...m.removedNodes].some(
          n =>
            n instanceof HTMLLinkElement &&
            n.hasAttribute('href') &&
            n.hasAttribute('hreflang') &&
            n.hasAttribute('rel') && n.rel === 'alternate',
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
