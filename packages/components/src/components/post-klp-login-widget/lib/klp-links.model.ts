import type { KlpSessionData } from './klp-session.model';

/**
 * Menu links are configuration, never session data. The platform tells the widget WHO the user is;
 * it never tells it where the links go.
 *
 * The shape is structurally identical to internet-header's `IconLinkConfig`, so the output of its
 * `getUserMenuOptions()` is absorbed with no remapping on either side.
 */
export interface KlpLink {
  /** Base text content, can be visible or visually hidden. */
  text: string;
  /** ARIA label, screen readers will use this instead of `text`. */
  label?: string;
  /** ARIA description, read after `text` or `label`. */
  description?: string;
  url: string;
  active?: boolean;
  icon?: string;
}

/**
 * Which switches a session is allowed to see. Both predicates are v9's, kept apart because they
 * produce different menu entries: `changeUserAndProfile` supersedes the older B2B company flag.
 */
export function showCompanySwitch(session: KlpSessionData): boolean {
  return (
    (session.userType === 'B2B' &&
      !!session.canChangeCompany &&
      session.changeUserAndProfile == null) ||
    session.changeUserAndProfile === 'profile'
  );
}

export function showAccountSwitch(session: KlpSessionData): boolean {
  return session.changeUserAndProfile === 'userAndProfile';
}

/** Link props accept an object or, so the widget can be driven from plain HTML, a JSON string. */
export function parseLinkProp<T>(value: T | string | undefined, propName: string): T | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`post-klp-login-widget: the \`${propName}\` property is not valid JSON.`, error);
    return null;
  }
}
