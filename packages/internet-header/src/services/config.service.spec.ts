import * as testConfigRaw from '@/assets/config/test-configuration.json';
import { LocalizedConfig } from '@/models/general.model';
import {
  fetchConfig,
  generateConfigUrl,
  getLocalizedConfig,
  isValidProjectId,
} from './config.service';

const testConfig: LocalizedConfig = testConfigRaw;

describe('config.service.ts', () => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(testConfig),
    }) as Promise<Response>;
  });

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
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

  describe('generateConfigUrl', () => {
    it('should return a test URL', () => {
      expect(generateConfigUrl('test', 'int01', 'de')).toEqual(
        'assets/config/test-configuration.json',
      );
    });

    it('should return an int URL', () => {
      expect(generateConfigUrl('topos', 'int01', 'de')).toEqual(
        'https://int.preview.post.ch/api/header?serviceId=topos&environment=INT01&lang=de',
      );
    });

    it('should include environment even on prod', () => {
      expect(generateConfigUrl('topos', 'prod', 'de')).toEqual(
        'https://www.post.ch/api/header?serviceId=topos&environment=PROD&lang=de',
      );
    });

    it('should reduce XSS risk', () => {
      expect(generateConfigUrl('<script>alert()</script>', 'prod', 'de')).toEqual(
        'https://www.post.ch/api/header?serviceId=%3Cscript%3Ealert%28%29%3C%2Fscript%3E&environment=PROD&lang=de',
      );
    });

    it('should uppercase the environment param', () => {
      // @ts-expect-error second argument should be of type 'dev01' | 'dev02' | 'devs1' | 'test' | 'int01' | 'int02' | 'prod'
      expect(generateConfigUrl('whatever', 'INT01', 'de')).toEqual(
        'https://int.preview.post.ch/api/header?serviceId=whatever&environment=INT01&lang=de',
      );
    });

    it('should lowercase the lang param', () => {
      expect(generateConfigUrl('topos', 'int01', 'DE')).toEqual(
        'https://int.preview.post.ch/api/header?serviceId=topos&environment=INT01&lang=de',
      );
    });
  });

  describe('fetchConfig', () => {
    it('should fetch config', async () => {
      const res = await fetchConfig('test', 'int01', 'de');
      expect(res).toEqual(testConfig);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLocalizedConfig', () => {
    it('should get correct local config', async () => {
      const config = await getLocalizedConfig({
        projectId: 'test',
        environment: 'int01',
        language: 'de',
      });
      expect(config).toEqual(testConfig);
    });

    it('should fetch again when the language changes', async () => {
      await getLocalizedConfig({ projectId: 'test', environment: 'int01', language: 'de' });
      await getLocalizedConfig({ projectId: 'test', environment: 'int01', language: 'fr' });

      // Two different languages must result in two separate network calls,
      // not a reused/cached response from the first call.
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should dedupe concurrent requests for the same language', async () => {
      const [configA, configB] = await Promise.all([
        getLocalizedConfig({ projectId: 'test', environment: 'int01', language: 'de' }),
        getLocalizedConfig({ projectId: 'test', environment: 'int01', language: 'de' }),
      ]);

      // Both calls resolve to equivalent config, but only one network call was made.
      expect(configA).toEqual(testConfig);
      expect(configB).toEqual(testConfig);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
