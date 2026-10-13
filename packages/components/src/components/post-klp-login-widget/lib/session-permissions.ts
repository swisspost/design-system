import type { KlpSessionData } from './klp-session.model';

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
