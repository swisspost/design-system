import type { KlpEnvironment } from './widget.model';

export const KLP_LANGUAGES = ['de', 'fr', 'it', 'en'] as const;
export type KlpLanguage = (typeof KLP_LANGUAGES)[number];

export type KlpLink =
  | 'login'
  | 'accountSwitch'
  | 'companySwitch'
  | 'myProfile'
  | 'messages'
  | 'settings'
  | 'logout';

/** The KLP account pages; the dev and test platforms use the int01 instance. */
export const ACCOUNT_BASE_URL: Record<KlpEnvironment, string> = {
  dev01: 'https://accountint1.post.ch',
  dev02: 'https://accountint1.post.ch',
  devs1: 'https://accountint1.post.ch',
  test: 'https://accountint1.post.ch',
  int01: 'https://accountint1.post.ch',
  int02: 'https://accountint2.post.ch',
  prod: 'https://account.post.ch',
};

/** The KLP service pages; the dev and test platforms use the int01 instance. */
export const SERVICE_BASE_URL: Record<KlpEnvironment, string> = {
  dev01: 'https://serviceint1.post.ch',
  dev02: 'https://serviceint1.post.ch',
  devs1: 'https://serviceint1.post.ch',
  test: 'https://serviceint1.post.ch',
  int01: 'https://serviceint1.post.ch',
  int02: 'https://serviceint2.post.ch',
  prod: 'https://service.post.ch',
};

/** The first candidate KLP offers, by its primary subtag; German, KLP's own default, otherwise. */
export function klpLanguage(...candidates: Array<string | null | undefined>): KlpLanguage {
  for (const candidate of candidates) {
    const code = candidate?.slice(0, 2).toLowerCase();
    const language = KLP_LANGUAGES.find(supported => supported === code);
    if (language) return language;
  }

  return 'de';
}

export interface KlpLinkOptions {
  environment: KlpEnvironment;
  language: KlpLanguage;
  service: string;
  /** Defaults to `service`. */
  app?: string;
  inIframe: boolean;
}

/** The links of the global Swiss Post header (Header API, 2026-11), for the given KLP service. */
export function defaultKlpLinks({
  environment,
  language,
  service,
  app = service,
  inIframe,
}: KlpLinkOptions): Record<KlpLink, string> {
  const account = ACCOUNT_BASE_URL[environment] ?? ACCOUNT_BASE_URL.prod;
  const serviceBase = SERVICE_BASE_URL[environment] ?? SERVICE_BASE_URL.prod;
  const target = `app=${encodeURIComponent(app)}&lang=${language}&service=${encodeURIComponent(service)}`;
  const contextSwitch = `${account}/logout/?${target}&inIframe=${inIframe}&changecompany=true`;

  return {
    login: `${account}/idp/?login&${target}`,
    accountSwitch: contextSwitch,
    companySwitch: contextSwitch,
    myProfile: `${account}/selfadmin/?lang=${language}`,
    messages: `${account}/selfadmin/messages/?lang=${language}`,
    settings: `${serviceBase}/kvm/app/ui/settings?lang=${language}`,
    logout: `${account}/logout/?lang=${language}&inIframe=${inIframe}`,
  };
}
