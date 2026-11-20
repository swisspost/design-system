import { showAccountSwitch, showCompanySwitch } from '../session-permissions';
import type { KlpSessionData } from '../session.model';

function session(overrides: Partial<KlpSessionData> = {}): KlpSessionData {
  return {
    name: 'Ada',
    surname: 'Lovelace',
    userType: 'B2B',
    authLevel: 'PASSWORD',
    ...overrides,
  };
}

describe('session-permissions', () => {
  describe('who may switch company', () => {
    it('lets a user with the old company flag switch, B2C and B2B alike', () => {
      for (const userType of ['B2C', 'B2B'] as const) {
        expect(showCompanySwitch(session({ userType, canChangeCompany: true }))).toBe(true);
      }
    });

    it('does not offer it without the flag', () => {
      expect(showCompanySwitch(session({ userType: 'B2B' }))).toBe(false);
    });

    it('lets the newer profile setting override the old flag, B2C and B2B alike', () => {
      for (const userType of ['B2C', 'B2B'] as const) {
        expect(showCompanySwitch(session({ userType, changeUserAndProfile: 'profile' }))).toBe(
          true,
        );
      }
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

    it('offers it to B2C and B2B users alike', () => {
      for (const userType of ['B2C', 'B2B'] as const) {
        expect(
          showAccountSwitch(session({ userType, changeUserAndProfile: 'userAndProfile' })),
        ).toBe(true);
      }
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
