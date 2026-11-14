import type { KlpSessionData } from './session.model';

/**
 * Which switches a session is allowed to see, solely from the subscribe response, whatever the user
 * type. `changeUserAndProfile` supersedes the older `canChangeCompany` flag.
 */
export function showCompanySwitch(session: KlpSessionData): boolean {
  return (
    (!!session.canChangeCompany && session.changeUserAndProfile == null) ||
    session.changeUserAndProfile === 'profile'
  );
}

export function showAccountSwitch(session: KlpSessionData): boolean {
  return session.changeUserAndProfile === 'userAndProfile';
}
