export type StickynessOptions = 'none' | 'minimal' | 'main' | 'full';

/**
 * Settings any implementor of the internet header can set on the component
 * itself. Has to be a valid JSON string.
 *
 * HTML example (note the quotes):
 * ```html
 * <post-internet-header config='{ "serviceId": "test" }'></post-internet-header>
 * ```
 * or via JavaScript:
 * ```js
 * const header = document.querySelector('post-internet-header');
 * header.config = { serviceId: 'test' };
 * ```
 */
export interface IImplementorConfig {
  serviceId: string;
  stickyness?: StickynessOptions;
  preferredLanguage?: string;
  languageCookieName?: string;
  languageStorageKey?: string;
}
