export interface AnalyticsConfig {
  gtmId: string;
  /** The host prefixes of each environment, the first environment with a matching prefix is used. */
  environments: Record<string, string[]>;
  fallbackEnvironment: string;
  sourceCodeVersion: string;
  /** Sent with every page view. */
  pageValues: Record<string, string>;
  /** Sent with the first page view only. */
  contextValues: Record<string, string>;
}

type DataLayerEntry = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

/**
 * Google Tag Manager: `page_context` for the first page view, `page_change` for the next ones.
 */
export class Analytics {
  private readonly config: AnalyticsConfig;
  private hasContext = false;

  public constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  public start() {
    window.dataLayer ??= [];
    this.push({ 'gtm.start': Date.now(), 'event': 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(this.config.gtmId)}`;
    document.head.append(script);
  }

  /** Call it once the document title is the one of the page. */
  public trackPage() {
    const page = {
      ...this.config.pageValues,
      page_name_language_neutral: document.title,
      page_url_language_neutral: location.href,
    };

    if (!this.hasContext) {
      this.hasContext = true;
      this.push({
        event: 'page_context',
        spa: 'true',
        ...page,
        ...this.config.contextValues,
        source_code_version: this.config.sourceCodeVersion,
        environment: this.getEnvironment(),
      });
      return;
    }

    this.push({
      event: 'page_change',
      ...page,
      virtual_pageview: 'true',
      virtual_page_name: document.title,
      virtual_url: location.href,
    });
  }

  private push(entry: DataLayerEntry) {
    window.dataLayer?.push(entry);
  }

  private getEnvironment(): string {
    for (const [environment, hostPrefixes] of Object.entries(this.config.environments)) {
      for (const hostPrefix of hostPrefixes) {
        if (location.host.startsWith(hostPrefix)) return environment;
      }
    }

    return this.config.fallbackEnvironment;
  }
}
