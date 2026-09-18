import type { KlpSessionData } from './klp-session.model';

/**
 * What a session is allowed to do. Both predicates are v9's, kept apart because they produce
 * different menu entries: `changeUserAndProfile` supersedes the older B2B company flag.
 *
 * The widget owns these rules so no consumer has to reimplement them. The consumer supplies the
 * markup for the entries they unlock; the platform never says where a link goes.
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
