import { getAlternateLinks, observeAlternateLinks } from './alternate-link.service';

const addLink = (hreflang: string, href: string): HTMLLinkElement => {
  const link = document.createElement('link');
  link.rel = 'alternate';
  link.hreflang = hreflang;
  link.href = href;
  document.head.appendChild(link);
  return link;
};

const clearLinks = () => {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
};

describe('alternate-link.service', () => {
  afterEach(() => {
    clearLinks();
  });

  describe('getAlternateLinks', () => {
    it('returns an empty map when no alternate links exist', () => {
      const result = getAlternateLinks();
      expect(result.size).toBe(0);
    });

    it('returns links for supported languages', () => {
      addLink('de', 'https://example.com/de/page');
      addLink('fr', 'https://example.com/fr/page');
      addLink('it', 'https://example.com/it/page');
      addLink('en', 'https://example.com/en/page');

      const result = getAlternateLinks();
      expect(result.size).toBe(4);
      expect(result.get('de')).toBe('https://example.com/de/page');
      expect(result.get('fr')).toBe('https://example.com/fr/page');
      expect(result.get('it')).toBe('https://example.com/it/page');
      expect(result.get('en')).toBe('https://example.com/en/page');
    });

    it('ignores unsupported hreflang values', () => {
      addLink('de', 'https://example.com/de/page');
      addLink('pt', 'https://example.com/pt/page');
      addLink('ja', 'https://example.com/ja/page');

      const result = getAlternateLinks();
      expect(result.size).toBe(1);
      expect(result.has('pt')).toBe(false);
      expect(result.has('ja')).toBe(false);
    });

    it('extracts the two-letter code from longer hreflang values', () => {
      addLink('de-CH', 'https://example.com/de-ch/page');
      addLink('fr-CH', 'https://example.com/fr-ch/page');

      const result = getAlternateLinks();
      expect(result.size).toBe(2);
      expect(result.get('de')).toBe('https://example.com/de-ch/page');
      expect(result.get('fr')).toBe('https://example.com/fr-ch/page');
    });

    it('uses the first match when duplicate hreflang values exist', () => {
      addLink('de', 'https://example.com/de/first');
      addLink('de', 'https://example.com/de/second');

      const result = getAlternateLinks();
      expect(result.get('de')).toBe('https://example.com/de/first');
    });

    it('does not throw when an alternate link is missing an href attribute', () => {
      // An empty href resolves to the current page URL via the URL constructor,
      // so we test with a link that has no href attribute at all
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = 'de';
      // Intentionally not setting link.href
      document.head.appendChild(link);

      addLink('fr', 'https://example.com/fr/page');

      const result = getAlternateLinks();
      // The de link has an empty href which resolves to the document URL - that's still valid.
      // The point is that the service doesn't crash.
      expect(result.has('fr')).toBe(true);
    });

    it('ignores links without rel="alternate"', () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.hreflang = 'de';
      link.href = 'https://example.com/de/page';
      document.head.appendChild(link);

      const result = getAlternateLinks();
      expect(result.size).toBe(0);
    });

    it('ignores links without hreflang', () => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.href = 'https://example.com/page';
      document.head.appendChild(link);

      const result = getAlternateLinks();
      expect(result.size).toBe(0);
    });

    it('resolves relative URLs against document base', () => {
      addLink('de', '/de/page');

      const result = getAlternateLinks();
      expect(result.get('de')).toContain('/de/page');
    });
  });

  describe('observeAlternateLinks', () => {
    it('fires callback when an alternate link is added', async () => {
      const callback = jest.fn();
      const disconnect = observeAlternateLinks(callback);

      addLink('de', 'https://example.com/de/page');

      // MutationObserver is async, wait for microtask
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(callback).toHaveBeenCalledTimes(1);
      const links = callback.mock.calls[0][0] as Map<string, string>;
      expect(links.get('de')).toBe('https://example.com/de/page');

      disconnect();
    });

    it('fires callback when an alternate link is removed', async () => {
      const link = addLink('de', 'https://example.com/de/page');

      const callback = jest.fn();
      const disconnect = observeAlternateLinks(callback);

      link.remove();
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(callback).toHaveBeenCalledTimes(1);
      const links = callback.mock.calls[0][0] as Map<string, string>;
      expect(links.size).toBe(0);

      disconnect();
    });

    it('fires callback when href attribute changes', async () => {
      const link = addLink('de', 'https://example.com/de/old');

      const callback = jest.fn();
      const disconnect = observeAlternateLinks(callback);

      link.href = 'https://example.com/de/new';
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(callback).toHaveBeenCalled();
      const links = callback.mock.calls[0][0] as Map<string, string>;
      expect(links.get('de')).toBe('https://example.com/de/new');

      disconnect();
    });

    it('does not fire callback for unrelated head changes', async () => {
      const callback = jest.fn();
      const disconnect = observeAlternateLinks(callback);

      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'test';
      document.head.appendChild(meta);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(callback).not.toHaveBeenCalled();

      meta.remove();
      disconnect();
    });

    it('stops firing after disconnect', async () => {
      const callback = jest.fn();
      const disconnect = observeAlternateLinks(callback);
      disconnect();

      addLink('de', 'https://example.com/de/page');
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
