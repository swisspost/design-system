import {
  ACCOUNT_BASE_URL,
  defaultKlpLinks,
  klpLanguage,
  type KlpLinkOptions,
  SERVICE_BASE_URL,
} from '../links';
import type { KlpEnvironment } from '../widget.model';

const options: KlpLinkOptions = {
  environment: 'prod',
  language: 'de',
  service: 'my-service',
  inIframe: false,
};

describe('links', () => {
  describe('base urls', () => {
    it.each<[KlpEnvironment, string, string]>([
      ['dev01', 'https://accountint1.post.ch', 'https://serviceint1.post.ch'],
      ['dev02', 'https://accountint1.post.ch', 'https://serviceint1.post.ch'],
      ['devs1', 'https://accountint1.post.ch', 'https://serviceint1.post.ch'],
      ['test', 'https://accountint1.post.ch', 'https://serviceint1.post.ch'],
      ['int01', 'https://accountint1.post.ch', 'https://serviceint1.post.ch'],
      ['int02', 'https://accountint2.post.ch', 'https://serviceint2.post.ch'],
      ['prod', 'https://account.post.ch', 'https://service.post.ch'],
    ])('maps %s onto its account and service hosts', (environment, account, service) => {
      expect(ACCOUNT_BASE_URL[environment]).toBe(account);
      expect(SERVICE_BASE_URL[environment]).toBe(service);
    });
  });

  describe('klpLanguage', () => {
    it('takes the first supported candidate by its primary subtag', () => {
      expect(klpLanguage(undefined, '', 'rm-CH', 'FR-ch', 'it')).toBe('fr');
    });

    it('skips values that are no language, such as "discover"', () => {
      expect(klpLanguage('discover', 'en')).toBe('en');
    });

    it('falls back to German when no candidate is supported', () => {
      expect(klpLanguage('rm', null, 'es')).toBe('de');
      expect(klpLanguage()).toBe('de');
    });
  });

  describe('defaultKlpLinks', () => {
    it('builds every link of the environment and language', () => {
      expect(defaultKlpLinks({ ...options, environment: 'int02', language: 'it' })).toEqual({
        login: 'https://accountint2.post.ch/idp/?login&app=my-service&lang=it&service=my-service',
        accountSwitch:
          'https://accountint2.post.ch/logout/?app=my-service&lang=it&service=my-service&inIframe=false&changecompany=true',
        companySwitch:
          'https://accountint2.post.ch/logout/?app=my-service&lang=it&service=my-service&inIframe=false&changecompany=true',
        myProfile: 'https://accountint2.post.ch/selfadmin/?lang=it',
        messages: 'https://accountint2.post.ch/selfadmin/messages/?lang=it',
        settings: 'https://serviceint2.post.ch/kvm/app/ui/settings?lang=it',
        logout: 'https://accountint2.post.ch/logout/?lang=it&inIframe=false',
      });
    });

    it('sends its own app when given one, and the service either way', () => {
      const { login } = defaultKlpLinks({ ...options, app: 'my-app' });

      expect(new URL(login).searchParams.get('app')).toBe('my-app');
      expect(new URL(login).searchParams.get('service')).toBe('my-service');
    });

    it('tells KLP about the iframe in the switches and the logout only', () => {
      const links = defaultKlpLinks({ ...options, inIframe: true });

      expect(new URL(links.accountSwitch).searchParams.get('inIframe')).toBe('true');
      expect(new URL(links.companySwitch).searchParams.get('inIframe')).toBe('true');
      expect(new URL(links.logout).searchParams.get('inIframe')).toBe('true');
      expect(links.login).not.toContain('inIframe');
    });

    it('encodes app and service, so they cannot add parameters of their own', () => {
      const { login } = defaultKlpLinks({ ...options, service: 'a&b=c', app: 'x y' });
      const params = new URL(login).searchParams;

      expect(params.get('service')).toBe('a&b=c');
      expect(params.get('app')).toBe('x y');
      expect(params.has('b')).toBe(false);
    });

    it('falls back to the prod hosts for an unknown environment', () => {
      const links = defaultKlpLinks({ ...options, environment: 'int03' as KlpEnvironment });

      expect(links.myProfile).toBe('https://account.post.ch/selfadmin/?lang=de');
      expect(links.settings).toBe('https://service.post.ch/kvm/app/ui/settings?lang=de');
    });
  });
});
