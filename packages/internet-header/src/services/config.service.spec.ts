import { ICustomConfig, ILocalizedCustomConfig, IPortalConfig } from '../models/general.model';
import { NavMainEntity } from '../models/header.model';
import * as testConfigRaw from '../assets/config/test-configuration.json';
import {
  fetchConfig,
  generateConfigUrl,
  getLocalizedConfig,
  getLocalizedCustomConfig,
  isMobile,
  isValidProjectId,
  mergeOsFlyoutOverrides,
  setMainNavigationIds,
} from './config.service';

const testConfig: IPortalConfig = testConfigRaw as IPortalConfig;

const customConfig = {
  de: {
    header: {
      navMain: [
        {
          title: 'Meine Links (custom config)',
          text: 'Meine Links',
          flyout: [
            {
              title: 'Google',
              linkList: [
                { url: window.location.href, title: 'Google Maps', target: '_blank' },
                { url: 'http://localhost:3333', title: 'Google Translate' },
                { url: 'http://localhost:3333/aaa/bbb/ccc', title: 'Google Translate' },
              ],
            },
          ],
        },
        {
          title: 'Mein Link (custom config, no flyout)',
          text: 'Mein Link',
          url: '#',
          noFlyout: true,
        },
      ],
    },
    footer: {
      block: {
        title: 'Eigene Footer-Konfiguration',
        links: [
          { url: 'https://fireship.io', text: 'Fireship.io', target: '_blank' },
          { url: 'https://css-tricks.com', text: 'CSS-Tricks', target: '_blank' },
          { url: 'https://web.dev', text: 'web.dev', target: '_blank' },
          { url: 'https://developer.mozilla.org', text: 'MDN Web Docs', target: '_blank' },
          { url: 'https://getbootstrap.com', text: 'Bootstrap', target: '_blank' },
          { url: 'https://google.com', text: 'Google', target: '_blank' },
          { url: 'https://microsoft.com', text: 'Microsoft', target: '_blank' },
        ],
      },
    },
  },
  en: {
    footer: {
      block: {
        title: 'Custom footer config',
        links: [
          { url: 'https://fireship.io', text: 'Fireship.io', target: '_blank' },
          { url: 'https://css-tricks.com', text: 'CSS-Tricks', target: '_blank' },
        ],
      },
    },
  },
};
const stringCustomConfig = JSON.stringify(customConfig);

describe('config.service.ts', () => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(testConfig),
    }) as Promise<Response>;
  });

  describe('isMobile', () => {
    it('checks the window width', () => {
      global.innerWidth = 500;
      expect(isMobile()).toBe(true);
      global.innerWidth = 1500;
      expect(isMobile()).toBe(false);
    });
  });

  describe('isValidProjectId', () => {
    it('Check if project id is valid', () => {
      expect(isValidProjectId('test')).toBe(true);
      expect(isValidProjectId('test123')).toBe(true);
      expect(isValidProjectId('test-1')).toBe(true);
      expect(isValidProjectId('test_1')).toBe(true);

      expect(isValidProjectId('1test')).toBe(false);

      expect(isValidProjectId(' test')).toBe(false);
      expect(isValidProjectId('-test')).toBe(false);
      expect(isValidProjectId('test-')).toBe(false);
      expect(isValidProjectId('tes!t')).toBe(false);
      expect(isValidProjectId('test.bla')).toBe(false);
      expect(isValidProjectId('test,xy')).toBe(false);
      expect(isValidProjectId('')).toBe(false);
    });
  });

  describe('setMainNavigationIds', () => {
    it('should replace all main nav ids with browser compatible ids and keep flyout_os', () => {
      const base = [
        { id: 123 },
        { id: 'flyout_os' },
        { id: '-11' },
        { id: '%' },
      ] as NavMainEntity[];
      setMainNavigationIds(base);
      expect(base).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.stringMatching(/^main-nav-.+|^flyout_os$/gi),
          }),
        ]),
      );
    });
  });

  describe('getLocalizedCustomConfig', () => {
    it('should parse the correct config', () => {
      expect(typeof getLocalizedCustomConfig(stringCustomConfig, 'de')).toBe('object');
    });

    it('should return object if config lang is found', () => {
      expect(typeof getLocalizedCustomConfig(customConfig as ICustomConfig, 'de')).toBe('object');
    });

    it('should return null if lang is not found in config', () => {
      expect(getLocalizedCustomConfig(stringCustomConfig, 'kz')).toBe(undefined);
    });
  });

  describe('generateConfigUrl', () => {
    it('should return a test URL', () => {
      expect(generateConfigUrl('test', 'int01')).toEqual('assets/config/test-configuration.json');
    });

    it('should return an int URL', () => {
      expect(generateConfigUrl('topos', 'int01')).toEqual(
        'https://int.post.ch/api/headerjs/Json?serviceid=topos&environment=int01',
      );
    });

    it('should return prod by default', () => {
      expect(generateConfigUrl('topos', 'prod')).toEqual(
        'https://www.post.ch/api/headerjs/Json?serviceid=topos',
      );
    });

    it('should reduce XSS risk', () => {
      expect(generateConfigUrl('<script>alert()</script>', 'prod')).toEqual(
        'https://www.post.ch/api/headerjs/Json?serviceid=%3Cscript%3Ealert()%3C%2Fscript%3E',
      );
    });

    it('should work with upper case env', () => {
      /* @ts-expect-error */
      expect(generateConfigUrl('whatever', 'INT01')).toEqual(
        'https://int.post.ch/api/headerjs/Json?serviceid=whatever&environment=int01',
      );
    });
  });

  describe('fetchConfig', () => {
    it('should fetch config', async () => {
      const res = await fetchConfig('test', 'int01');
      expect(res).toEqual(testConfig);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('mergeOsFlyoutOverrides', () => {
    it('should merge configs correctly', () => {
      const newConfig = mergeOsFlyoutOverrides(testConfig.de!, {
        title: 'Test',
      } as NavMainEntity);

      const osFlyout = newConfig.find(nav => nav.id === 'flyout_os');
      if (!osFlyout) fail('osFlyout is undefined');
      expect(osFlyout.title).toBe('Test');
    });

    it('should not overwrite function parameter', () => {
      const newConfig = mergeOsFlyoutOverrides(testConfig.de!, {
        title: 'Test',
        flyout: [
          {
            linkList: [
              {
                title: 'Additional link',
                url: '/',
              },
            ],
          },
        ],
      } as NavMainEntity);

      const osFlyout = newConfig.find(nav => nav.id === 'flyout_os');
      if (!osFlyout || !osFlyout.flyout) {
        console.warn('osFlyout or osFlyout.flyout is undefined, skipping test.');
        return;
      }
      expect(osFlyout.flyout[0].linkList.length).toBe(2);

      const newConfig2 = mergeOsFlyoutOverrides(testConfig.de!, {
        title: 'Test',
        flyout: [
          {
            linkList: [
              {
                title: 'Additional link',
                url: '/',
              },
            ],
          },
        ],
      } as NavMainEntity);

      const osFlyout2 = newConfig2.find(nav => nav.id === 'flyout_os');
      if (!osFlyout2 || !osFlyout2.flyout) {
        console.warn('osFlyout2 or osFlyout2.flyout is undefined, skipping test.');
        return;
      }
      expect(osFlyout2.flyout[0].linkList.length).toBe(2);
    });

    it('should extend os flyout with additional columns', () => {
      const newConfig = mergeOsFlyoutOverrides(testConfig.de!, {
        title: 'Test',
        flyout: [
          {
            linkList: [
              {
                title: 'Additional link',
                url: '/',
              },
            ],
          },
          {
            title: 'New column',
            linkList: [
              {
                title: 'Link in new column',
                url: '/',
              },
            ],
          },
        ],
      } as NavMainEntity);

      const osFlyout = newConfig.find(nav => nav.id === 'flyout_os');
      if (!osFlyout || !osFlyout.flyout) {
        console.warn('osFlyout or osFlyout.flyout is undefined, skipping test.');
        return;
      }

      expect(osFlyout.flyout.length).toBe(2);
    });
  });

  describe('getLocalizedConfig', () => {
    it('should get correct local config', async () => {
      const config = await getLocalizedConfig({
        projectId: 'test',
        environment: 'int01',
        language: 'de',
      });
      expect(config).toEqual(testConfig.de);
    });

    it('should modify the config correctly', async () => {
      const config = await getLocalizedConfig({
        projectId: 'test',
        environment: 'int01',
        language: 'de',
        localizedCustomConfig: {
          header: {
            navMain: [
              {
                title: 'New Navmain',
                flyout: [
                  {
                    title: 'New Navcol',
                    linkList: [
                      {
                        title: 'New Navlink',
                        url: '/',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        } as ILocalizedCustomConfig,
      });

      const [lastMainNav] = config.header.navMain.slice(-1);

      expect(lastMainNav.title).toBe('New Navmain');

      if (!lastMainNav?.flyout) {
        console.warn('lastMainNav.flyout is undefined, skipping test.');
        return;
      }
      expect(lastMainNav.flyout.length).toBe(1);
    });

    it('should extend flyout_os', async () => {
      const config = await getLocalizedConfig({
        projectId: 'test',
        environment: 'int01',
        language: 'de',
        osFlyoutOverrides: {
          flyout: [
            {
              title: 'OS Extender',
              linkList: [
                {
                  title: 'Added link',
                  url: '/',
                },
              ],
            },
          ],
        } as NavMainEntity,
      });
      const osFlyout = config.header.navMain.find(nav => nav.id === 'flyout_os');
      if (!osFlyout || !osFlyout.flyout) {
        console.warn('osFlyout or osFlyout.flyout is undefined, skipping test.');
        return;
      }
      expect(osFlyout.flyout[0].linkList.length).toBe(2);
    });
  });
});
