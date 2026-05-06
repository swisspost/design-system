import * as testConfigRaw from '@/assets/config/test-configuration.json';
import { PortalConfig } from '@/models/general.model';
import {
  fetchConfig,
  generateConfigUrl,
  getLocalizedConfig,
  isValidProjectId,
} from './config.service';

const testConfig: PortalConfig = testConfigRaw as PortalConfig;

describe('config.service.ts', () => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(testConfig),
    }) as Promise<Response>;
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
      // @ts-expect-error second argument should be of type 'dev01' | 'dev02' | 'devs1' | 'test' | 'int01' | 'int02' | 'prod'
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

  describe('getLocalizedConfig', () => {
    it('should get correct local config', async () => {
      const config = await getLocalizedConfig({
        projectId: 'test',
        environment: 'int01',
        language: 'de',
      });
      expect(config).toEqual(testConfig.de);
    });
  });
});
