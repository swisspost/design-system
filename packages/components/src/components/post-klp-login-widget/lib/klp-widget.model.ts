import type { KlpKeepAliveConf } from './keep-alive';

/** The KLP platform instances. These names are the platform's and cannot be renamed. */
export type KlpEnvironment = 'dev01' | 'dev02' | 'devs1' | 'test' | 'int01' | 'int02' | 'prod';

/** Mirrors the portal's `loginWidgetOptions`, reduced to the keys the v10 widget reads. */
export interface KlpLoginWidgetConfig {
  applicationId: string;
  serviceId: string;
  appLoginUrl: string;
  currentLang: string;
  /** The portal's own keep-alive url. The platform session is refreshed either way. */
  keepAliveUrl?: string;
  options?: Partial<KlpKeepAliveConf>;
}
