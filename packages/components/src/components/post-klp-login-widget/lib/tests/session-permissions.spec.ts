import type { KlpSessionData } from '../klp-session.model';
import { showAccountSwitch, showCompanySwitch } from '../session-permissions';

function session(overrides: Partial<KlpSessionData> = {}): KlpSessionData {
  return {
    name: 'Ada',
    surname: 'Lovelace',
    userType: 'B2B',
    authLevel: 'PASSWORD',
    ...overrides,
  };
}

describe('session permissions', () => {
  describe('who may switch company', () => {
    it('lets a B2B user with the old company flag switch', () => {
      expect(showCompanySwitch(session({ userType: 'B2B', canChangeCompany: true }))).toBe(true);
    });

    it('does not offer it to a B2C user, whoever set the flag', () => {
      expect(showCompanySwitch(session({ userType: 'B2C', canChangeCompany: true }))).toBe(false);
    });

    it('does not offer it without the flag', () => {
      expect(showCompanySwitch(session({ userType: 'B2B' }))).toBe(false);
    });

    it('lets the newer profile setting override the old flag', () => {
      expect(showCompanySwitch(session({ userType: 'B2C', changeUserAndProfile: 'profile' }))).toBe(
        true,
      );
    });

    it('ignores the old flag once the newer setting is present', () => {
      expect(
        showCompanySwitch(
          session({
            userType: 'B2B',
            canChangeCompany: true,
            changeUserAndProfile: 'notAvailable',
          }),
        ),
      ).toBe(false);
    });
  });

  describe('who may switch account', () => {
    it('offers it only for userAndProfile', () => {
      expect(showAccountSwitch(session({ changeUserAndProfile: 'userAndProfile' }))).toBe(true);
    });

    it('does not offer it for a plain profile switch', () => {
      expect(showAccountSwitch(session({ changeUserAndProfile: 'profile' }))).toBe(false);
    });

    it('does not offer it when the platform says it is unavailable', () => {
      expect(showAccountSwitch(session({ changeUserAndProfile: 'notAvailable' }))).toBe(false);
    });

    it('does not offer it when the platform says nothing', () => {
      expect(showAccountSwitch(session())).toBe(false);
    });
  });
});
